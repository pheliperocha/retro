import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Retrospective } from '@models/retrospective';
import { ApiService } from '@services/api.service';

@Injectable()
export class RetrospectiveResolverService implements Resolve<Retrospective> {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Retrospective> {
    const id = route.paramMap.get('id');

    return this.apiService.getRetrospectives(id).then().catch(() => {
      this.router.navigate(['dashboard']);
      return null;
    });
  }
}
