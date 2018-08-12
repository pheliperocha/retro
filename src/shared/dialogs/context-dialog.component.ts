import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-context-dialog',
  template: `
    <mat-dialog-content>
      <p style="font-size: 24px" *ngIf="!editing">{{ retroContext }}</p>
      <textarea #contextInput style="font-size: 24px; min-height: 150px; min-width: 400px" [hidden]="!editing">{{ retroContext }}</textarea>
    </mat-dialog-content>

    <mat-dialog-actions *ngIf="retroState === 1">
      <button mat-icon-button *ngIf="editing" (click)="saveContext(contextInput?.value)">
        <mat-icon class="mat-24">save</mat-icon>
      </button>

      <button mat-icon-button *ngIf="!editing" (click)="editContext(true)">
        <mat-icon class="mat-24">edit</mat-icon>
      </button>

      <button mat-icon-button *ngIf="editing" (click)="editContext(false)">
        <mat-icon class="mat-24">clear</mat-icon>
      </button>
    </mat-dialog-actions>
  `,
})
export class ContextDialogComponent {
  public retroContext: string;
  public retroState: number;
  public editing = false;

  constructor(public dialogRef: MatDialogRef<ContextDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.retroContext = data.context;
    this.retroState = data.retroState;
  }

  saveContext(context: string) {
    this.dialogRef.close(context);
  }

  editContext(state: boolean) {
    this.editing = state;
  }
}
