import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'create-card-dialog',
  template: `    
  <p>Informe seu feedback</p>
  
  <textarea #feedbackInput></textarea>
  
  <md-dialog-actions>
    <button md-button fxFlex (click)="dialogRef.close(0)">Cancelar</button>
    <button md-button fxFlex (click)="createCard(feedbackInput.value)">Salvar</button>
  </md-dialog-actions>
  `
})
export class CreateCardDialogComponent {

  constructor(public dialogRef: MatDialogRef<CreateCardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  createCard(feedback: string) {
    this.dialogRef.close({ feedback: feedback });
  }
}
