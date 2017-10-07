import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RetrospectiveThumbs } from '../../models/retrospectiveThumbs';

@Injectable()
export class ApiService {
  private apiUrl = 'http://localhost:5000/';

  constructor(private http: Http) {
  }

  getAllRetrospectives(userId): Promise<Array<RetrospectiveThumbs>> {
    return this.http
      .get(this.apiUrl + 'facilitador/' + userId + '/retrospective')
      .toPromise()
      .then((response) => {
        return response.json() as RetrospectiveThumbs[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Infelizmente ocorreu um erro ', error);
    return Promise.reject(error.message || error);
  }
}
