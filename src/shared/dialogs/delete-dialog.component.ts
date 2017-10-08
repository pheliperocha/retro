import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'delete-dialog',
  template: `    
  <p>{{ message }}</p>
  <md-dialog-actions>
    <button md-button fxFlex (click)="dialogRef.close(0)">Não</button>
    <button md-button fxFlex (click)="deleteList()">Sim</button>
  </md-dialog-actions>
  `
})
export class DeleteDialogComponent {
  message: string;

  constructor(public dialogRef: MdDialogRef<DeleteDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
    this.message = data.message;
  }

  deleteList() {
    if (this.data.object) {
      this.dialogRef.close(this.data.object);
    } else {
      this.dialogRef.close(1);
    }
  }
}
