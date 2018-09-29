import { Component, Input } from '@angular/core';
import { DeleteDialogComponent } from '../dialogs/delete-dialog.component';
import { MatDialog } from '@angular/material';
import { User } from '@models/user';
import { List } from '@models/list';
import { Card } from '@models/card';
import { RetrospectiveService } from '@services/retrospective.service';
import { AuthService } from '@services/auth/auth.service';
import { CreateCardDialogComponent } from '../dialogs/createCard-dialog.component';

@Component({
  selector: 'retro-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public user: User;
  @Input() list: List;
  @Input() cards: Card[];
  @Input() retroState: number;
  public editing = false;

  constructor(
    public deleteDialog: MatDialog,
    private retrospectiveService: RetrospectiveService,
    private authService: AuthService
  ) {
    this.user = authService.getUser();
  }

  createCard() {
    const dialogRef = this.deleteDialog.open(CreateCardDialogComponent, {
      data: this.list
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        const newCard: Card = {
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
    const update = {
      'nome': newTitle
    };

    this.retrospectiveService.updateList(this.list.id, update).then(response => {
      if (response.updated === true) {
        this.list.title = newTitle;
        this.editing = false;
      }
    }).catch(console.error);
  }

  deleteList() {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja remover essa lista?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        return this.retrospectiveService.deleteList(this.list);
      }
    });
  }
}
