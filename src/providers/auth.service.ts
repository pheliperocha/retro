import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {}

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
