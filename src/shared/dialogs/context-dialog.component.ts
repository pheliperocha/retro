import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'context-dialog',
  template: `
    <md-dialog-content>
      <p style="font-size: 24px" *ngIf="!editing">{{ retroContext }}</p>
      <textarea #contextInput style="font-size: 24px; min-height: 150px; min-width: 400px" [hidden]="!editing">{{ retroContext }}</textarea>
    </md-dialog-content>
    
    <md-dialog-actions>
      <button md-icon-button *ngIf="editing" (click)="saveContext(contextInput?.value)">
        <md-icon class="md-24">save</md-icon>
      </button>
      
      <button md-icon-button *ngIf="!editing" (click)="editContext(true)">
        <md-icon class="md-24">edit</md-icon>
      </button>

      <button md-icon-button *ngIf="editing" (click)="editContext(false)">
        <md-icon class="md-24">clear</md-icon>
      </button>
    </md-dialog-actions>
  `,
})
export class ContextDialogComponent {
  public retroContext: string;
  public editing: boolean = false;

  constructor(public dialogRef: MdDialogRef<ContextDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
    this.retroContext = data;
  }

  saveContext(context: string) {
    this.dialogRef.close(context);
  }

  editContext(state: boolean) {
    this.editing = state;
  }
}
