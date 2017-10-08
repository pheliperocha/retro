import {Component, EventEmitter, Inject, Output} from "@angular/core";
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";

@Component({
  selector: 'your-dialog-selector',
  template: `    
  <p>Tem certeza que deseja deletar essa lista?</p>
  <md-dialog-actions>
    <button md-button fxFlex (click)="dialogRef.close(0)">Não</button>
    <button md-button fxFlex (click)="deleteList()">Sim</button>
  </md-dialog-actions>
  `
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MdDialogRef<DeleteDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {}

  deleteList() {
    this.dialogRef.close(1);
  }
}
