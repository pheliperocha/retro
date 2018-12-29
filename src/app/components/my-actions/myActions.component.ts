import { Component } from '@angular/core';
import { Retrospective } from '@models/retrospective';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'retro-my-actions',
  templateUrl: './myActions.component.html',
  styleUrls: ['./myActions.component.scss']
})
export class MyActionsComponent {
  public retrospectives: Partial<Retrospective>[];

  constructor(private apiService: ApiService) {
    this.apiService.getAllMyActions().then(retrospectives => {
      this.retrospectives = retrospectives;
    });
  }
}
