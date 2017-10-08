import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Card } from "../../models/card";

@Injectable()
export class CardsResolverService implements Resolve<Card> {
  constructor(private apiService: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Card> {
    let id = route.paramMap.get('id');

    return this.apiService.getCards(id).then(cards => {
      return cards;
    }).catch(err => {
      this.router.navigate(['dashboard']);
      return null;
    });
  }
}
