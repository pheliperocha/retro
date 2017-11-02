import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';
import { Retrospective } from '../../models/retrospective';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list';
import { AppSettings } from '../../app/app.settings';
import { RetrospectiveService } from '../../providers/retrospective.service';
import { Subscription } from 'rxjs/Subscription';
import { DragulaService } from 'ng2-dragula';
import { MdDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../shared/dialogs/delete-dialog.component';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Card } from '../../models/card';

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.scss'],
  providers: [ RetrospectiveService ]
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
  private getNewMemberSubscribe: Subscription;
  private getLeftMemberSubscribe: Subscription;
  private getNewCardSubscribe: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private retrospectiveService: RetrospectiveService,
    public confirmDialog: MdDialog,
    private dragulaService: DragulaService,
    private socket: Socket
  ) {
    this.user = this.authService.user;
    this.socket.connect();
  }

  ngOnInit() {
    this.retrospective = this.route.snapshot.data['retrospective'];
    this.lists = this.route.snapshot.data['lists'];

    this.socket.emit('subscribe', this.retrospective.id);
    this.socket.emit('enter', {retroId: this.retrospective.id, user: this.user});

    this.getNewCardSubscribe = this.getNewCard().subscribe(card => {
      let index = this.lists.findIndex((list) => (list.id === card.listId));
      if (index != -1) {
        this.lists[index].cards.push(card);
      }
    });

    this.deleteListSubscribe = this.retrospectiveService.deleteListSource$.subscribe(list => {
      let index = this.lists.findIndex((elt) => (elt===list));
      if (index != -1) {
        this.lists.splice(index, 1);
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


    this.getNewMemberSubscribe = this.getNewMember().subscribe(user => {
      if (this.retrospective.facilitador.id != user.id) {
        let memberIndex = this.retrospective.members.findIndex((member) => (member.id === user.id));

        if (memberIndex < 0) {
          this.retrospective.members.push(user);
        }
      }
    });

    this.getLeftMemberSubscribe = this.getLeftMember().subscribe(user => {
      if (this.retrospective.facilitador.id != user.id) {
        let memberIndex = this.retrospective.members.findIndex((member) => (member.id === user.id));

        if (memberIndex >= 0) {
          this.retrospective.members.splice(memberIndex, 1);
        }
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

    this.dragulaSubscribe = this.dragulaService.drop.subscribe((value) => {});
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
    let newPin = Math.random().toString().substr(-6);

    let update = {
      'status_reuniao': 2,
      'pin': newPin
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.state = 2;
        this.retrospective.pin = newPin;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  goToReflexaoStep() {
    let update = {
      'status_reuniao': 3
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.state = 3;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  createList() {
    this.retrospectiveService.createNewList(this.retrospective.id).then(list => {
      list.cards = [];
      this.lists.push(list);
    }).catch(err => {
      console.log(err);
    })
  }

  getNewMember(): Observable<User> {
    let observable = new Observable(observer => {
      this.socket.on('enter_member', user => {
        observer.next(user);
      });
    });
    return observable;
  }

  getLeftMember(): Observable<User> {
    let observable = new Observable(observer => {
      this.socket.on('left_member', user => {
        observer.next(user);
      });
    });
    return observable;
  }

  getNewCard(): Observable<Card> {
    let observable = new Observable(observer => {
      this.socket.on('new_card', card => {
        observer.next(card);
      });
    });
    return observable;
  }

  ngOnDestroy() {
    this.deleteListSubscribe.unsubscribe();
    this.addCardSubscribe.unsubscribe();
    this.deleteCardSubscribe.unsubscribe();
    this.dragulaSubscribe.unsubscribe();
    this.socket.emit('left', {retroId: this.retrospective.id, user: this.user});
    this.getNewMemberSubscribe.unsubscribe();
    this.getLeftMemberSubscribe.unsubscribe();
    this.getNewCardSubscribe.unsubscribe();
    this.socket.disconnect();
    this.dragulaService.destroy('bag-list');
    this.dragulaService.destroy('bag-cards');
  }
}
