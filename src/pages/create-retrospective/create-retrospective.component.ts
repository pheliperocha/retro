import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Template } from '../../models/template';
import { RetrospectiveService } from '../../providers/retrospective.service';
import { Router } from '@angular/router';
import { ApiService } from '../../providers/api/api.service';

@Component({
  selector: 'create-retrospective',
  templateUrl: './create-retrospective.component.html',
  styleUrls: ['./create-retrospective.component.scss'],
  providers: [
    RetrospectiveService
  ]
})
export class CreateRetrospectiveComponent {
  public templates: Template[];
  public selectedTemplate: number = 1;

  constructor(public dialogRef: MdDialogRef<CreateRetrospectiveComponent>,
              @Inject(MD_DIALOG_DATA) public data: any,
              private retrospectiveService: RetrospectiveService,
              private apiService: ApiService,
              private router: Router) {
    this.apiService.getAllTemplates().then(templates => {
      this.templates = templates;
    }).catch(err => {
      console.log(err);
    });
  }

  selectTemplate(templateId: number) {
    this.selectedTemplate = templateId;
  }

  createNewRetrospective(title: string, context: string) {
    this.retrospectiveService.createNewRetrospective(title, context, this.selectedTemplate).then(retrospective => {
      this.dialogRef.close();
      this.router.navigate(['/retrospective/' + retrospective.id]);
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  }
}