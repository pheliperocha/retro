import { Component } from '@angular/core';
import { ApiService } from '../../providers/api/api.service';
import { Retrospective } from '../../models/retrospective';

@Component({
  selector: 'app-my-actions',
  templateUrl: './myActions.component.html',
  styleUrls: ['./myActions.component.scss']
})
export class MyActionsComponent {
  public retrospectives: Retrospective[];

  constructor(private apiService: ApiService) {
    this.apiService.getAllMyActions().then(retrospectives => {
      this.retrospectives = retrospectives;
    });
  }
}
