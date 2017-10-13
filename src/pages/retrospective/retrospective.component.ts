import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';
import { Retrospective } from '../../models/retrospective';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list';
import { Card } from '../../models/card';
import { AppSettings } from '../../app/app.settings';
import { RetrospectiveService } from '../../providers/retrospective.service';
import { Subscription } from 'rxjs/Subscription';
import { DragulaService } from 'ng2-dragula';
import { MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../shared/dialogs/delete-dialog.component';

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.scss'],
  providers: [RetrospectiveService]
})
export class RetrospectiveComponent implements OnInit {
  public user: User;
  public id: number;
  public retrospective: Retrospective;
  public lists: List[];
  public appSettings = AppSettings;
  private deleteListSubscribe: Subscription;
  private addCardSubscribe: Subscription;
  private deleteCardSubscribe: Subscription;
  private dragulaSubscribe: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private retrospectiveService: RetrospectiveService,
    public confirmDialog: MdDialog,
    private dragulaService: DragulaService,
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.retrospective = this.route.snapshot.data['retrospective'];
    this.lists = this.route.snapshot.data['lists'];

    this.deleteListSubscribe = this.retrospectiveService.deleteListSource$.subscribe(list => {
      console.log('Delete List');
      let index = this.lists.findIndex((elt) => (elt===list));
      if (index != -1) {
        this.lists.splice(index, 1);
      }
    });

    this.addCardSubscribe = this.retrospectiveService.addCardSource$.subscribe(card => {
      let index = this.lists.findIndex((list) => (list.id === card.listId));
      if (index != -1) {
        this.lists[index].cards.push(card);
      }
    });

    this.deleteCardSubscribe = this.retrospectiveService.deleteCardSource$.subscribe(card => {
      let listIndex = this.lists.findIndex((list) => (list.id === card.listId));

      if (listIndex != -1) {
        let cards = this.lists[listIndex].cards;
        let cardIndex = cards.findIndex((elt) => (elt.id === card.id));

        cards.splice(cardIndex, 1);
      }
    });

    this.dragulaService.setOptions('bag-list', {
      revertOnSpill: true,
      moves: (el: any, container: any, handle: any): any => {
        if (this.retrospective.state !== 1) {
          return false;
        }
        return handle.classList.contains('handle');
      }
    });

    this.dragulaService.setOptions('bag-cards', {
      revertOnSpill: true,
      moves: (el: any, container: any, handle: any): any => {
        return el.classList.contains('drag');
      }
    });

    this.dragulaSubscribe = this.dragulaService.drop.subscribe((value) => {
      console.log('=====');
      console.log(value[2]);
    });
  }

  goToPrepareStep() {
    if (this.retrospective.members.length >= 1) {

      let dialogRef = this.confirmDialog.open(DeleteDialogComponent, {
        data: { message: 'Existe outras pessoas acessando essa reunião, ao voltar para etapa de preparação, todos os outros participantes serão desconectador. Tem certeza que deseja continuar?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.changeToPrepareStep();
        }
      });
    } else {
      this.changeToPrepareStep();
    }
  }

  private changeToPrepareStep() {
    let update = {
      'op': 'replace',
      'path': 'state',
      'value': 1
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.state = 1;
        this.retrospective.pin = null;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  goToFeedbackStep() {
    let update = {
      'op': 'replace',
      'path': 'state',
      'value': 2
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.state = 2;
        this.retrospective.pin = response.data.pin;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  goToReflexaoStep() {
    this.retrospective.state = 3;
  }

  createList() {
    this.retrospectiveService.createNewList().then(list => {
      this.lists.push(list);
    }).catch(err => {
      console.log(err);
    })
  }

  onListDeleted(list: List) {
    let index = this.lists.findIndex((elt) => (elt===list));
    if (index != -1) {
      this.lists.splice(index, 1);
    }
  }

  ngOnDestroy() {
    console.log('Destroy Retrospective');
    this.deleteListSubscribe.unsubscribe();
    this.addCardSubscribe.unsubscribe();
    this.dragulaSubscribe.unsubscribe();
    this.dragulaService.destroy('bag-list');
    this.dragulaService.destroy('bag-cards');
  }
}
