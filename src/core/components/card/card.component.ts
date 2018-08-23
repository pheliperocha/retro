import { Component, Input } from '@angular/core';
import { DeleteDialogComponent } from '../dialogs/delete-dialog.component';
import { MatDialog } from '@angular/material';
import { RetrospectiveService } from '../../../core/services/retrospective.service';
import { AuthService } from '../../authentication/auth.service';
import { User } from '../../../models/user';
import { Card } from '../../../models/card';

@Component({
  selector: 'retro-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  public user: User;
  @Input() card: Card;
  @Input() retroState: number;
  @Input() reflexao = false;
  public editing = false;

  constructor(
    public deleteDialog: MatDialog,
    private retrospectiveService: RetrospectiveService,
    private authService: AuthService
  ) {
    this.user = authService.getUser();
  }

  saveCard(feedback: string) {
    const update = {
      'comentario': feedback
    };

    this.retrospectiveService.updateCard(this.card.id, update).then(response => {
      if (response.updated === true) {
        this.card.description = feedback;
        this.editing = false;
      }
    }).catch(console.error);
  }

  editCard(state: boolean) {
    this.editing = state;
  }

  deleteCard(card) {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja remover esse feedback?', object: card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object) {
        this.retrospectiveService.deleteCard(card);
      }
    });
  }

  vote() {
    if (this.card.voted === 0 || this.card.voted == null) {
      this.retrospectiveService.upvoteCard(this.card.id, this.user.id).then(response => {
        if (response === true) {
          this.card.voted = 1;
        }
      });
    } else {
      this.retrospectiveService.downvoteCard(this.card.id, this.user.id).then(response => {
        if (response === true) {
          this.card.voted = 0;
        }
      });
    }
  }
}
