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
import {DragulaService} from "ng2-dragula";

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
  private deleteListSubscribe: Subscription;
  private addCardSubscribe: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private retrospectiveService: RetrospectiveService,
    private dragulaService: DragulaService,
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.retrospective = this.route.snapshot.data['retrospective'];
    this.lists = this.route.snapshot.data['lists'];
    this.cards = this.route.snapshot.data['cards'];

    this.deleteListSubscribe = this.retrospectiveService.deleteListSource$.subscribe(list => {
      console.log('Delete List');
      let index = this.lists.findIndex((elt) => (elt===list));
      if (index != -1) {
        this.lists.splice(index, 1);
      }
    });

    this.addCardSubscribe = this.retrospectiveService.addCardSource$.subscribe(card => {
      console.log(3);
      this.cards.push(card);
    });

    this.dragulaService.setOptions('bag-list', {
      revertOnSpill: true,
      moves: function (el: any, container: any, handle: any): any {
        return handle.classList.contains('handle');
      }
    });

    this.dragulaService.setOptions('bag-cards', {
      revertOnSpill: true
    });

    this.dragulaService.drop.subscribe((value) => {
      console.log('=====');
      console.log(value[2]);
    });
  }

  getCardsFromList(listId: number): Card[] {
    return this.cards.filter(function (info) {
      return info.listId == listId;
    });
  }

  test() {
    this.cards.push({
      id: 8,
      description: 'sdfsdfds',
      listId: 2,
      votes: 2
    });

    console.log(this.cards);
  }

  createList() {
    let newList = {
      id: 4,
      title: '',
      order: 3
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
    this.deleteListSubscribe.unsubscribe();
  }
}
