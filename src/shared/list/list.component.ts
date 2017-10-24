import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';
import { DeleteDialogComponent } from '../dialogs/delete-dialog.component';
import { MdDialog } from '@angular/material';
import { List } from '../../models/list';
import { RetrospectiveService } from '../../providers/retrospective.service';
import { CreateCardDialogComponent } from '../dialogs/createCard-dialog.component';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public user: User;
  @Input() list: List;
  @Input() cards: Card[];
  @Input() retroState: number;
  public editing: boolean = false;

  constructor(public deleteDialog: MdDialog,
              private retrospectiveService: RetrospectiveService,
              private authService: AuthService) {
    this.user = authService.user;
  }

  createCard() {
    let dialogRef = this.deleteDialog.open(CreateCardDialogComponent, {
      data: this.list
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        let newCard: Card = {
          listId: this.list.id,
          description: result.feedback,
          userId: this.user.id,
          retroId: this.list.retroId
        };

        this.retrospectiveService.addCard(newCard);
      }
    });
  }

  editList(status: boolean) {
    this.editing = status;
  }

  saveList(newTitle: string) {
    let update = {
      'nome': newTitle
    };

    this.retrospectiveService.updateList(this.list.id, update).then(response => {
      if (response.updated === true) {
        this.list.title = newTitle;
        this.editing = false;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  deleteList() {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja remover essa lista?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.retrospectiveService.deleteList(this.list);
      }
    });
  }
}
