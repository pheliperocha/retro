import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'create-card-dialog',
  template: `    
  <p>Informe seu feedback</p>
  
  <textarea #feedbackInput></textarea>
  
  <mat-dialog-actions>
    <button mat-button fxFlex (click)="dialogRef.close(0)">Cancelar</button>
    <button mat-button fxFlex (click)="createCard(feedbackInput.value)">Salvar</button>
  </mat-dialog-actions>
  `
})
export class CreateCardDialogComponent {

  constructor(public dialogRef: MatDialogRef<CreateCardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  createCard(feedback: string) {
    this.dialogRef.close({ feedback: feedback });
  }
}
