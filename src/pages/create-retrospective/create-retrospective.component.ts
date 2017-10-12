import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Template } from '../../models/template';
import {RetrospectiveService} from "../../providers/retrospective.service";
import {Router} from "@angular/router";

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
              private router: Router) {

    this.templates = [
      {
        id: 1,
        name: 'Template 1',
        image: 'http://placehold.it/200x200'
      },{
        id: 2,
        name: 'Template 2',
        image: 'http://placehold.it/200x200'
      },{
        id: 3,
        name: 'Template 3',
        image: 'http://placehold.it/200x200'
      },{
        id: 4,
        name: 'Template 4',
        image: 'http://placehold.it/200x200'
      },{
        id: 5,
        name: 'Template 5',
        image: 'http://placehold.it/200x200'
      }
    ];
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
