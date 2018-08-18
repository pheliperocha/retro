

import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Retrospective } from '../../models/retrospective';
import { ApiService } from '../http/api.service';

@Injectable()
export class RetrospectiveResolverService implements Resolve<Retrospective> {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Retrospective> {
    const id = route.paramMap.get('id');

    return this.apiService.getRetrospectives(id).then(retrospective => {
      return retrospective;
    }).catch(err => {
      this.router.navigate(['dashboard']);
      return null;
    });
  }
}
