import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';
import { DeleteDialogComponent } from '../dialogs/delete-dialog.component';
import { MdDialog } from '@angular/material';
import { RetrospectiveService } from '../../providers/retrospective.service';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  public user: User;
  @Input() card: Card;
  @Input() retroState: number;
  @Input() reflexao: boolean = false;
  public editing: boolean = false;

  constructor(public deleteDialog: MdDialog,
              private retrospectiveService: RetrospectiveService,
              private authService: AuthService) {
    this.user = authService.user;
  }

  saveCard(feedback: string) {
    let update = {
      'comentario': feedback
    };

    this.retrospectiveService.updateCard(this.card.id, update).then(response => {
      if (response.updated === true) {
        this.card.description = feedback;
        this.editing = false;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  editCard(state: boolean) {
    this.editing = state;
  }

  deleteCard(card) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      data: { message: 'Tem certeza que deseja remover esse feedback?', object: card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Object) {
        this.retrospectiveService.deleteCard(card);
      }
    });
  }

  vote() {
    if (this.card.voted == 0 || this.card.voted == null) {
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
