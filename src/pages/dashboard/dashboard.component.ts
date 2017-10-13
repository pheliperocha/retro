import { Component } from '@angular/core';
import { ApiService } from '../../providers/api/api.service';
import { Retrospective } from '../../models/retrospective';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';
import { CreateRetrospectiveComponent } from '../create-retrospective/create-retrospective.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public user: User;
  public retrospectives: Retrospective[];

  constructor(private authService: AuthService,
              private apiService: ApiService,
              public newRetroDialog: MdDialog) {
    this.user = this.authService.user;

    this.apiService.getAllRetrospectives(this.user.id).then(retrospectives => {
      this.retrospectives = retrospectives;
    });
  }

  createNewRetrospective() {
    let dialogRef = this.newRetroDialog.open(CreateRetrospectiveComponent, {
      width: '700px'
    });
  }
}
