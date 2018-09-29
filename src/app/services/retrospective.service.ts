import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { List } from '@models/list';
import { Card } from '@models/card';
import { ApiService } from '@services/api.service';
import { Annotation } from '@models/annotation';
import { User } from '@models/user';
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class RetrospectiveService {
  public user: User;
  public deleteListSource = new Subject<List>();
  public addCardSource = new Subject<Card>();
  public deleteCardSource = new Subject<Card>();

  deleteListSource$ = this.deleteListSource.asObservable();
  deleteCardSource$ = this.deleteCardSource.asObservable();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  private static handleError(error: any): Promise<any> {
    console.error('Infelizmente ocorreu um erro ', error);
    return Promise.reject(error.message || error);
  }

  getCards(retrospectiveId: number): Promise<Card[]> {
    return this.apiService.getCards(retrospectiveId).then(cards => {
      return cards;
    });
  }

  updateRetrospective(retrospectiveId, update): Promise<any> {
    return this.apiService.updateRetrospective(retrospectiveId, update).then(response => {
      return response;
    }).catch(console.error);
  }

  updateList(listId, update): Promise<any> {
    return this.apiService.updateList(listId, update).then(response => {
      return response;
    }).catch(console.error);
  }

  updateCard(cardId, update): Promise<any> {
    return this.apiService.updateCard(cardId, update).then(response => {
      return response;
    }).catch(console.error);
  }

  upvoteCard(cardId, userId): Promise<boolean> {
    return this.apiService.upvoteCard(cardId, userId).then(response => {
      return response;
    }).catch(RetrospectiveService.handleError);
  }

  downvoteCard(cardId, userId): Promise<boolean> {
    return this.apiService.downvoteCard(cardId, userId).then(response => {
      return response;
    }).catch(RetrospectiveService.handleError);
  }

  createNewRetrospective(title: string, context: string, templateId: number): Promise<number> {
    const retrospective = {
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
    }).catch(console.error);
  }

  createNewList(retroId): Promise<List> {
    const list = {
      title: '',
      retroId: retroId
    };

    return this.apiService.createNewList(list).then(newList => {
      return newList;
    }).catch(RetrospectiveService.handleError);
  }

  createNewAnnotation(annotation: Annotation): Promise<Annotation> {
    return this.apiService.createNewAnnotation(annotation).then(newAnnotation => {
      return newAnnotation;
    }).catch(RetrospectiveService.handleError);
  }

  addCard(card: Card) {
    this.apiService.createNewCard(card).then(newCard => {
      this.addCardSource.next(newCard);
    }).catch(console.error);
  }

  deleteCard(card: Card) {
    this.apiService.deleteCard(card.id).then(response => {
      if (response === true) {
        this.deleteCardSource.next(card);
      }
    }).catch(console.error);
  }

  deleteList(list: List) {
    return this.apiService.deleteList(list.id).then(response => {
      if (response === true) {
        this.deleteListSource.next(list);
      }
    }).catch(console.error);
  }
}
