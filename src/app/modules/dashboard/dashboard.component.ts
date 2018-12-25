import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Retrospective } from '@models/retrospective';
import { AuthService } from '@services/auth/auth.service';
import { User } from '@models/user';
import { CreateRetrospectiveComponent } from '@modules/create-retrospective/create-retrospective.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'retro-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: User;
  public retrospectives: Retrospective[];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    public newRetroDialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    this.apiService.getAllRetrospectives(this.user.id).then(retrospectives => {
      this.retrospectives = retrospectives;
    });
  }

  createNewRetrospective() {
    this.newRetroDialog.open(CreateRetrospectiveComponent, {
      width: '700px'
    });
  }
}
