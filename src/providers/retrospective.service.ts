import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { List } from '../models/list';
import { Card } from '../models/card';
import { ApiService } from './api/api.service';
import { Annotation } from '../models/annotation';
import { AuthService } from './oauth/auth.service';
import { User } from '../models/user';

@Injectable()
export class RetrospectiveService {
  public user: User;

  private deleteListSource = new Subject<List>();
  private addCardSource = new Subject<Card>();
  private deleteCardSource = new Subject<Card>();

  deleteListSource$ = this.deleteListSource.asObservable();
  addCardSource$ = this.addCardSource.asObservable();
  deleteCardSource$ = this.deleteCardSource.asObservable();

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.user = this.authService.user;
  }

  getCards(retrospectiveId: number): Promise<Card[]> {
    return this.apiService.getCards(retrospectiveId).then(cards => {
      return cards;
    }).catch(err => {
      console.log(err);
    })
  }

  updateRetrospective(retrospectiveId, update): Promise<any> {
    return this.apiService.updateRetrospective(retrospectiveId, update).then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    });
  }

  updateList(listId, update): Promise<any> {
    return this.apiService.updateList(listId, update).then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    });
  }

  updateCard(cardId, update): Promise<any> {
    return this.apiService.updateCard(cardId, update).then(response => {
      return response;
    }).catch(err => {
      console.log(err);
    });
  }

  createNewRetrospective(title: string, context: string, templateId: number): Promise<number> {
    let retrospective = {
      id: null,
      title: title,
      context: context,
      templateId: templateId,
      state: null,
      date: null,
      image: null,
      facilitador: {
        id: this.user.id,
        name: this.user.name,
        image: this.user.image
      },
      pin: null
    };

    return this.apiService.createNewRetrospective(retrospective).then(newRetrospective => {
      return newRetrospective.id;
    }).catch(err => {
      console.log(err);
    });
  }

  createNewList(retroId): Promise<List> {
    let list = {
      title: '',
      retroId: retroId
    };

    return this.apiService.createNewList(list).then(newList => {
      return newList;
    }).catch(err => {
      console.log(err);
    });
  }

  createNewAnnotation(annotation: Annotation): Promise<Annotation> {
    return this.apiService.createNewAnnotation(annotation).then(newAnnotation => {
      return newAnnotation;
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
    this.apiService.deleteCard(card.id).then(response => {
      if (response === true) {
        this.deleteCardSource.next(card);
      }
    }).catch(err => {
      console.log(err);
    });
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
}
