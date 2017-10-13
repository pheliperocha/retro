import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { List } from '../models/list';
import { Card } from '../models/card';
import { ApiService } from './api/api.service';
import { Retrospective } from '../models/retrospective';

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

  updateRetrospective(retrospectiveId, update): Promise<boolean> {
    return this.apiService.updateRetrospective(retrospectiveId, update).then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    });
  }

  updateList(listId, update): Promise<boolean> {
    return this.apiService.updateList(listId, update).then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    });
  }

  updateCard(cardId, update): Promise<boolean> {
    return this.apiService.updateCard(cardId, update).then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    });
  }

  createNewRetrospective(title: string, context: string, templateId: number): Promise<Retrospective> {
    let retrospective = {
      id: null,
      title: title,
      context: context,
      state: null,
      date: null,
      image: null,
      pin: null
    };

    return this.apiService.createNewRetrospective(retrospective).then(newRetrospective => {
      return newRetrospective;
    }).catch(err => {
      console.log(err);
    });
  }

  createNewList(): Promise<List> {
    let list = {
      id: null,
      title: '',
      order: null,
      cards: []
    };

    return this.apiService.createNewList(list).then(newList => {
      return newList;
    }).catch(err => {
      console.log(err);
    });
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
    return this.apiService.deleteList(list.id).then(response => {
      if (response === true) {
        this.deleteListSource.next(list);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  changeList(list: List) {
    this.changeListSource.next(list);
  }
}
