import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public isLogged: boolean = true;

  constructor() {}

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isLogged) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
