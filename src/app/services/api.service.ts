import { Injectable } from '@angular/core';
import { Retrospective } from '@models/retrospective';
import { List } from '@models/list';
import { Card } from '@models/card';
import { Template } from '@models/template';
import { Annotation } from '@models/annotation';
import { environment } from '@config/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addMember(retroId: number, userId: number): Promise<boolean> {
    return this.http
      .post(this.apiUrl + 'retros/members', {retroId: retroId, userId: userId})
      .toPromise<any>();
  }

  removeMember(retroId: number, userId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'retros/' + retroId + '/members/' + userId)
      .toPromise<any>();
  }

  getAllTemplates(): Promise<Template[]> {
    return this.http
      .get(`${this.apiUrl}templates`)
      .toPromise<any>();
  }

  createNewCard(card: Card): Promise<Card> {
    return this.http
      .post(this.apiUrl + 'cards', card)
      .toPromise<any>();
  }

  createNewRetrospective(retrospective: Retrospective): Promise<any> {
    return this.http
      .post(this.apiUrl + 'retros', retrospective)
      .toPromise();
  }

  createNewList(list: List): Promise<List> {
    return this.http
      .post(this.apiUrl + 'lists', list)
      .toPromise();
  }

  createNewAnnotation(annotation: Annotation): Promise<Annotation> {
    return this.http
      .post(this.apiUrl + 'annotations', annotation)
      .toPromise();
  }

  getAllRetrospectives(): Promise<Retrospective[]> {
    return this.http
      .get(this.apiUrl + 'users/retros')
      .toPromise<any>();
  }

  getRetrospectives(id): Promise<Retrospective> {
    return this.http
      .get(this.apiUrl + 'retros/' + id)
      .toPromise<any>();
  }

  getAllMyActions(): Promise<Partial<Retrospective>[]> {
    return this.http
      .get(this.apiUrl + 'users/actions')
      .toPromise<any>();
  }

  getLists(id): Promise<List[]> {
    return this.http
      .get(this.apiUrl + 'retros/' + id + '/lists')
      .toPromise<any>();
  }

  getCards(retrospectiveId): Promise<Card[]> {
    return this.http
      .get(this.apiUrl + 'retros/' + retrospectiveId + '/cards')
      .toPromise<any>();
  }

  updateRetrospective(retrospectiveId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retros/' + retrospectiveId, update)
      .toPromise();
  }

  updateList(listId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'lists/' + listId, update)
      .toPromise();
  }

  sortLists(retroId: number, update: Array<Array<number>>): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retros/' + retroId + '/lists/positions', update)
      .toPromise();
  }

  sortCards(retroId: number, update: Array<Array<number>>): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retros/' + retroId + '/cards/positions', update)
      .toPromise();
  }

  updateCard(cardId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'cards/' + cardId, update)
      .toPromise<any>();
  }

  deleteList(listId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'lists/' + listId)
      .toPromise<any>();
  }

  deleteCard(cardId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'cards/' + cardId)
      .toPromise<any>();
  }

  upvoteCard(cardId: number, userId: number): Promise<boolean> {
    return this.http
      .post(this.apiUrl + 'cards/' + cardId + '/votes', {userId: userId})
      .toPromise<any>();
  }

  downvoteCard(cardId: number, userId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'cards/' + cardId + '/users/' + userId)
      .toPromise<any>();
  }

  addResponsible(annotationId: number, userId: number) {
    return this.http
      .post(this.apiUrl + 'annotations/' + annotationId + '/users', {userId: userId})
      .toPromise();
  }

  removeResponsible(annotationId: number, userId: number) {
    return this.http
      .delete(this.apiUrl + 'annotations/' + annotationId + '/users/' + userId)
      .toPromise();
  }
}
