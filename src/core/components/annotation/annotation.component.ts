import { Component, Input } from '@angular/core';
import { Annotation } from '@models/annotation';
import { User } from '@models/user';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'retro-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent {
  @Input() annotation: Annotation;
  @Input() members: User[];

  constructor(private apiService: ApiService) {}

  addResponsible(annotation: Annotation, responsible: User) {
    this.apiService.addResponsible(annotation.id, responsible.id)
      .then(response => {
        if (response === true) {
          annotation.responsibles.push(responsible);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  removeResponsible(annotation: any, responsible: User) {
    this.apiService.removeResponsible(annotation.id, responsible.id)
      .then(response => {
        if (response === true) {
          const index = annotation.responsibles.findIndex((user) => (user.id === responsible.id));
          if (index !== -1) {
            annotation.responsibles.splice(index, 1);
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
