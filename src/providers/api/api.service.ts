import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Retrospective } from '../../models/retrospective';
import { List } from '../../models/list';

@Injectable()
export class ApiService {
  private apiUrl = 'http://localhost:5000/';

  constructor(private http: Http) {
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

  private handleError(error: any): Promise<any> {
    console.error('Infelizmente ocorreu um erro ', error);
    return Promise.reject(error.message || error);
  }
}
