import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';
import { Retrospective } from '../../models/retrospective';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list';
import { Card } from '../../models/card';

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.scss']
})
export class RetrospectiveComponent implements OnInit {
  public user: User;
  public id: number;
  public retrospective: Retrospective;
  public lists: List[];
  public cards: Card[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.retrospective = this.route.snapshot.data['retrospective'];
    this.lists = this.route.snapshot.data['lists'];
    this.cards = this.route.snapshot.data['cards'];
  }

  getCardsFromList(listId: number): Card[] {
    return this.cards.filter(function (info) {
      return info.listId == listId;
    });
  }
}
