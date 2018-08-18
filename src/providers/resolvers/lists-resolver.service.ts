

import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../api/api.service';
import { List } from '../../models/list';

@Injectable()
export class ListsResolverService implements Resolve<List> {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<List[]> {
    const id = route.paramMap.get('id');
    return this.apiService.getLists(id).then().catch(() => this.router.navigate(['dashboard']));
  }
}
