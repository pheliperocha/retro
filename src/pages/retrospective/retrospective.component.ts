import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/oauth/auth.service';
import { User } from '../../models/user';
import { Retrospective } from '../../models/retrospective';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list';
import { Card } from '../../models/card';
import { AppSettings } from '../../app/app.settings';
import {RetrospectiveService} from "../../providers/retrospective.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.scss'],
  providers: [RetrospectiveService]
})
export class RetrospectiveComponent implements OnInit {
  public user: User;
  public id: number;
  public retrospective: Retrospective;
  public lists: List[];
  public cards: Card[];
  public appSettings = AppSettings;
  private deleteSubscribe: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private retrospectiveService: RetrospectiveService
  ) {
    this.user = this.authService.user;

    this.deleteSubscribe = this.retrospectiveService.deleteListSource$.subscribe(list => {
      console.log('Delete List');
      let index = this.lists.findIndex((elt) => (elt===list));
      if (index != -1) {
        this.lists.splice(index, 1);
      }
    });
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

  createList() {
    let newList = {
      id: 4,
      title: ''
    };

    this.lists.push(newList);
  }

  onListDeleted(list: List) {
    let index = this.lists.findIndex((elt) => (elt===list));
    if (index != -1) {
      this.lists.splice(index, 1);
    }
  }

  ngOnDestroy() {
    console.log('Destroy Retrospective');
    this.deleteSubscribe.unsubscribe();
  }
}
