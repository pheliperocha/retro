import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

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

  constructor(public dialogRef: MdDialogRef<CreateCardDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {}

  createCard(feedback: string) {
    console.log(feedback);
    this.dialogRef.close({ feedback: feedback });
  }
}
