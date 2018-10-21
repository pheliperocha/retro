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
      .toPromise()
      .catch(this.handleError);
  }

  removeMember(retroId: number, userId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'retros/' + retroId + '/members/' + userId)
      .toPromise()
      .catch(this.handleError);
  }

  getAllTemplates(): Promise<Template[]> {
    return this.http
      .get(this.apiUrl + 'templates')
      .toPromise()
      .catch(this.handleError);
  }

  createNewCard(card: Card): Promise<Card> {
    return this.http
      .post(this.apiUrl + 'cards', card)
      .toPromise()
      .catch(this.handleError);
  }

  createNewRetrospective(retrospective: Retrospective): Promise<any> {
    return this.http
      .post(this.apiUrl + 'retros', retrospective)
      .toPromise()
      .catch(this.handleError);
  }

  createNewList(list: List): Promise<List> {
    return this.http
      .post(this.apiUrl + 'lists', list)
      .toPromise()
      .catch(this.handleError);
  }

  createNewAnnotation(annotation: Annotation): Promise<Annotation> {
    return this.http
      .post(this.apiUrl + 'annotations', annotation)
      .toPromise()
      .catch(this.handleError);
  }

  getAllRetrospectives(userId): Promise<Retrospective[]> {
    return this.http
      .get(this.apiUrl + 'users/retros')
      .toPromise()
      .catch(this.handleError);
  }

  getRetrospectives(id): Promise<Retrospective> {
    return this.http
      .get(this.apiUrl + 'retros/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  getAllMyActions(): Promise<Array<Retrospective>> {
    return this.http
      .get(this.apiUrl + 'users/actions')
      .toPromise()
      .catch(this.handleError);
  }

  getLists(id): Promise<List[]> {
    return this.http
      .get(this.apiUrl + 'retros/' + id + '/lists')
      .toPromise()
      .catch(this.handleError);
  }

  getCards(retrospectiveId): Promise<Card[]> {
    return this.http
      .get(this.apiUrl + 'retros/' + retrospectiveId + '/cards')
      .toPromise()
      .catch(this.handleError);
  }

  updateRetrospective(retrospectiveId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retros/' + retrospectiveId, update)
      .toPromise()
      .catch(this.handleError);
  }

  updateList(listId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'lists/' + listId, update)
      .toPromise()
      .catch(this.handleError);
  }

  sortLists(retroId: number, update: Array<Array<number>>): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retros/' + retroId + '/lists/positions', update)
      .toPromise()
      .catch(this.handleError);
  }

  sortCards(retroId: number, update: Array<Array<number>>): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retros/' + retroId + '/cards/positions', update)
      .toPromise()
      .catch(this.handleError);
  }

  updateCard(cardId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'cards/' + cardId, update)
      .toPromise()
      .catch(this.handleError);
  }

  deleteList(listId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'lists/' + listId)
      .toPromise()
      .catch(this.handleError);
  }

  deleteCard(cardId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'cards/' + cardId)
      .toPromise()
      .catch(this.handleError);
  }

  upvoteCard(cardId: number, userId: number): Promise<boolean> {
    return this.http
      .post(this.apiUrl + 'cards/' + cardId + '/votes', {userId: userId})
      .toPromise()
      .catch(this.handleError);
  }

  downvoteCard(cardId: number, userId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'cards/' + cardId + '/users/' + userId)
      .toPromise()
      .catch(this.handleError);
  }

  addResponsible(annotationId: number, userId: number) {
    return this.http
      .post(this.apiUrl + 'annotations/' + annotationId + '/users', {userId: userId})
      .toPromise()
      .catch(this.handleError);
  }

  removeResponsible(annotationId: number, userId: number) {
    return this.http
      .delete(this.apiUrl + 'annotations/' + annotationId + '/users/' + userId)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Infelizmente ocorreu um erro ', error);
    return Promise.reject(error.message || error);
  }
}
