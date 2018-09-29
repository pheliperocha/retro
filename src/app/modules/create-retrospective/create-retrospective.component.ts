import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Template } from '@models/template';
import { RetrospectiveService } from '@services/retrospective.service';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'retro-create-retrospective',
  templateUrl: './create-retrospective.component.html',
  styleUrls: ['./create-retrospective.component.scss'],
  providers: [ RetrospectiveService ]
})
export class CreateRetrospectiveComponent {
  public templates: Template[];
  public selectedTemplate = 1;
  public swiperConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
  };

  constructor(public dialogRef: MatDialogRef<CreateRetrospectiveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
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
    this.retrospectiveService.createNewRetrospective(title, context, this.selectedTemplate).then(retrospectiveId => {
      this.dialogRef.close();
      return this.router.navigate(['/retrospective/' + retrospectiveId]);
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  }
}
