import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';
import {DeleteDialogComponent} from "../dialogs/delete-dialog.component";
import {MdDialog} from "@angular/material";
import {RetrospectiveService} from "../../providers/retrospective.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card;
  public voted: boolean = false;
  public editing: boolean = false;

  constructor(public deleteDialog: MdDialog, private retrospectiveService: RetrospectiveService) {}

  saveCard(feedback: string) {
    this.card.description = feedback;
    this.editing = false;
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
