import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { List } from '../models/list';
import { Card } from '../models/card';
import { ApiService } from './api/api.service';

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

  constructor(private apiService: ApiService) {}

  createNewRetrospective(title: string, context: string, templateId: number) {

    let newRetrospective = {
      id: 5,
      title: title,
      context: context,
      state: 1,
      date: '2017-10-12',
      image: '',
      pin: '12487'
    };

    return Promise.resolve(newRetrospective);
  }

  addCard(card: Card) {
    this.apiService.createNewCard(card).then(card => {
      this.addCardSource.next(card);
    }).catch(err => {
      console.log(err);
    });
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
