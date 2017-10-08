import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Card } from '../../models/card';
import { DeleteDialogComponent } from "../dialogs/delete-dialog.component";
import {MdDialog} from "@angular/material";
import {List} from "../../models/list";
import {RetrospectiveService} from "../../providers/retrospective.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() list: List;
  @Input() cards: Card[];
  @Input() state: number;
  subscription: Subscription;

  constructor(public deleteDialog: MdDialog, private retrospectiveService: RetrospectiveService) {}

  deleteList(list: List) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      data: list
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.retrospectiveService.deleteList(list);
      }
    });
  }

  ngOnDestroy() {
    console.log('destroy list');
  }
}
