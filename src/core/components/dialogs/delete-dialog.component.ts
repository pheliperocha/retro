import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'retro-delete-dialog',
  template: `
  <p>{{ message }}</p>
  <mat-dialog-actions>
    <button mat-button fxFlex (click)="dialogRef.close(0)">Não</button>
    <button mat-button fxFlex (click)="deleteList()">Sim</button>
  </mat-dialog-actions>
  `
})
export class DeleteDialogComponent {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
