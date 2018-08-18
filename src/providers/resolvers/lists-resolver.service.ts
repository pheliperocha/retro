import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../api/api.service';
import { List } from '../../models/list';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ListsResolverService implements Resolve<List[]> {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List[]> | Promise<List[]> | List[] {
    const id = route.paramMap.get('id');
    return this.apiService.getLists(id).then().catch((error) => {
      this.router.navigate(['dashboard']);
      return Promise.reject(error.message || error);
    });
  }
}
