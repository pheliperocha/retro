import { Injectable } from '@angular/core';
import { Retrospective } from '../../models/retrospective';
import { List } from '../../models/list';
import { Card } from '../../models/card';
import { Template } from '../../models/template';
import { Annotation } from '../../models/annotation';
import { environment } from '../../config/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addMember(retroId: number, userId: number): Promise<boolean> {
    return this.http
      .post(this.apiUrl + 'retrospective/member', {retroId: retroId, userId: userId})
      .toPromise()
      .catch(this.handleError);
  }

  removeMember(retroId: number, userId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'retrospective/' + retroId + '/member/' + userId)
      .toPromise()
      .catch(this.handleError);
  }

  getAllTemplates(): Promise<Template[]> {
    return this.http
      .get(this.apiUrl + 'template')
      .toPromise()
      .catch(this.handleError);
  }

  createNewCard(card: Card): Promise<Card> {
    return this.http
      .post(this.apiUrl + 'card', card)
      .toPromise()
      .catch(this.handleError);
  }

  createNewRetrospective(retrospective: Retrospective): Promise<any> {
    return this.http
      .post(this.apiUrl + 'retrospective', retrospective)
      .toPromise()
      .catch(this.handleError);
  }

  createNewList(list: List): Promise<List> {
    return this.http
      .post(this.apiUrl + 'list', list)
      .toPromise()
      .catch(this.handleError);
  }

  createNewAnnotation(annotation: Annotation): Promise<Annotation> {
    return this.http
      .post(this.apiUrl + 'annotation', annotation)
      .toPromise()
      .catch(this.handleError);
  }

  getAllRetrospectives(userId): Promise<Retrospective[]> {
    return this.http
      .get(this.apiUrl + 'facilitador/' + userId + '/retrospective')
      .toPromise()
      .catch(this.handleError);
  }

  getRetrospectives(id): Promise<Retrospective> {
    return this.http
      .get(this.apiUrl + 'retrospective/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  getAllMyActions(): Promise<Array<Retrospective>> {
    return this.http
      .get(this.apiUrl + 'actions/')
      .toPromise()
      .catch(this.handleError);
  }

  getLists(id): Promise<List[]> {
    return this.http
      .get(this.apiUrl + 'retrospective/' + id + '/list')
      .toPromise()
      .catch(this.handleError);
  }

  getCards(retrospectiveId): Promise<Card[]> {
    return this.http
      .get(this.apiUrl + 'retrospective/' + retrospectiveId + '/card')
      .toPromise()
      .catch(this.handleError);
  }

  updateRetrospective(retrospectiveId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retrospective/' + retrospectiveId, update)
      .toPromise()
      .catch(this.handleError);
  }

  updateList(listId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'list/' + listId, update)
      .toPromise()
      .catch(this.handleError);
  }

  sortLists(retroId: number, update: Array<Array<number>>): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retrospective/' + retroId + '/list/sort', update)
      .toPromise()
      .catch(this.handleError);
  }

  sortCards(retroId: number, update: Array<Array<number>>): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'retrospective/' + retroId + '/card/sort', update)
      .toPromise()
      .catch(this.handleError);
  }

  updateCard(cardId: number, update: object): Promise<any> {
    return this.http
      .patch(this.apiUrl + 'card/' + cardId, update)
      .toPromise()
      .catch(this.handleError);
  }

  deleteList(listId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'list/' + listId)
      .toPromise()
      .catch(this.handleError);
  }

  deleteCard(cardId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'card/' + cardId)
      .toPromise()
      .catch(this.handleError);
  }

  upvoteCard(cardId: number, userId: number): Promise<boolean> {
    return this.http
      .post(this.apiUrl + 'card/' + cardId + '/vote', {userId: userId})
      .toPromise()
      .catch(this.handleError);
  }

  downvoteCard(cardId: number, userId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'card/' + cardId + '/user/' + userId)
      .toPromise()
      .catch(this.handleError);
  }

  addResponsible(annotationId: number, userId: number) {
    return this.http
      .post(this.apiUrl + 'annotation/' + annotationId + '/user', {userId: userId})
      .toPromise()
      .catch(this.handleError);
  }

  removeResponsible(annotationId: number, userId: number) {
    return this.http
      .delete(this.apiUrl + 'annotation/' + annotationId + '/user/' + userId)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Infelizmente ocorreu um erro ', error);
    return Promise.reject(error.message || error);
  }
}
