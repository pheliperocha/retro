import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {List} from "../models/list";
import {Card} from "../models/card";

@Injectable()
export class RetrospectiveService {

  private deleteListSource = new Subject<List>();
  private changeListSource = new Subject<List>();
  private addCardSource = new Subject<Card>();
  private deleteCardSource = new Subject<Card>();

  deleteListSource$ = this.deleteListSource.asObservable();
  changeListSource$ = this.changeListSource.asObservable();
  addCardSource$ = this.addCardSource.asObservable();
  deleteCardSource$ = this.deleteCardSource.asObservable();

  addCard(card: Card) {
    console.log(2);
    this.addCardSource.next(card);
  }

  deleteCard(card: Card) {
    this.deleteCardSource.next(card);
  }

  deleteList(list: List) {
    this.deleteListSource.next(list);
  }

  changeList(list: List) {
    this.changeListSource.next(list);
  }
}
