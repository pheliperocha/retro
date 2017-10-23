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
  public voted: boolean = false;
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
      console.log(response);
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
      if (result !== 0) {
        this.retrospectiveService.deleteCard(card);
      }
    });
  }

  vote() {
    if (this.voted === false) {
      this.voted = true;
      this.card.votes++;
    } else {
      this.voted = false;
      this.card.votes--;
    }
  }
}
