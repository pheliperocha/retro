import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Retrospective } from '../../models/retrospective';
import { List } from '../../models/list';
import { Card } from '../../models/card';
import { Template } from '../../models/template';

@Injectable()
export class ApiService {
  private apiUrl = 'http://localhost:5000/';

  constructor(private http: Http) {}

  getAllTemplates(): Promise<Template[]> {
    return this.http
      .get(this.apiUrl + 'template')
      .toPromise()
      .then(response => {
        return response.json();
      }).catch(this.handleError);
  }

  createNewCard(card: Card): Promise<Card> {
    return this.http
      .post(this.apiUrl + 'card', card)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  createNewRetrospective(retrospective: Retrospective): Promise<Retrospective> {
    return this.http
      .post(this.apiUrl + 'retrospective', retrospective)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  createNewList(list: List): Promise<List> {
    return this.http
      .post(this.apiUrl + 'list', list)
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getAllRetrospectives(userId): Promise<Array<Retrospective>> {
    return this.http
      .get(this.apiUrl + 'facilitador/' + userId + '/retrospective')
      .toPromise()
      .then((response) => {
        return response.json() as Retrospective[];
      })
      .catch(this.handleError);
  }

  getRetrospectives(id): Promise<Retrospective> {
    return this.http
      .get(this.apiUrl + 'retrospective/' + id)
      .toPromise()
      .then((response) => {
        return response.json() as Retrospective;
      })
      .catch(this.handleError);
  }

  getLists(id): Promise<List[]> {
    return this.http
      .get(this.apiUrl + 'retrospective/' + id + '/list')
      .toPromise()
      .then((response) => {
        return response.json() as List;
      })
      .catch(this.handleError);
  }

  getCards(retrospectiveId): Promise<Card[]> {
    return this.http
      .get(this.apiUrl + 'retrospective/' + retrospectiveId + '/card')
      .toPromise()
      .then((response) => {
        return response.json() as Card;
      })
      .catch(this.handleError);
  }

  updateRetrospective(retrospectiveId: number, update: object): Promise<boolean> {
    return this.http
      .patch(this.apiUrl + 'retrospective/' + retrospectiveId, update)
      .toPromise()
      .then(response => {
        return response.json() as Card;
      })
      .catch(this.handleError);
  }

  updateList(listId: number, update: object): Promise<boolean> {
    return this.http
      .patch(this.apiUrl + 'list/' + listId, update)
      .toPromise()
      .then(response => {
        return response.json() as Card;
      })
      .catch(this.handleError);
  }

  deleteList(listId: number): Promise<boolean> {
    return this.http
      .delete(this.apiUrl + 'list/' + listId)
      .toPromise()
      .then(response => {
        return response.json() as Card;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Infelizmente ocorreu um erro ', error);
    return Promise.reject(error.message || error);
  }
}
