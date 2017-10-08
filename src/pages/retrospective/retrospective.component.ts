import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';
import { Retrospective } from '../../models/retrospective';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.scss']
})
export class RetrospectiveComponent implements OnInit {
  public user: User;
  public id: number;
  public retrospective: Retrospective;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.retrospective = this.route.snapshot.data['retrospective'];
  }
}
