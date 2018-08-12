import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {
  Router, Route,
  CanActivate, CanActivateChild, CanLoad,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { User } from '../../models/user';

@Injectable()
export class AuthService implements CanActivate, CanActivateChild, CanLoad {
  private code: string;
  private cachedURL: string;
  private loginProvider: string;
  private loading: boolean;
  private loginURI: string;
  public user: User;

  private configObj = {
    'authEndpoint': '',
    'clientId': '',
    'redirectURI': ''
  };

  constructor(private _http: Http, private router: Router, private location: Location) {
    const config = localStorage.getItem('authConfig');
    const provider = localStorage.getItem('provider');
    const cachedURL = localStorage.getItem('cachedurl');
    const params = new URLSearchParams(this.location.path(false).split('?')[1]);
    this.code = params.get('code');

    if (config) {
      this.configObj = JSON.parse(config)[provider];
      this.loginURI =  JSON.parse(config).loginRoute;
    }

    if (provider) {
      this.loginProvider =  provider;
    }

    if (cachedURL) {
      this.cachedURL = cachedURL;
    } else {
      this.cachedURL = '';
    }

    if (this.code) {
      this.login(this.code, this.configObj.clientId, this.configObj.redirectURI, this.configObj.authEndpoint)
      .then(() => {
        this.loading = false;
        this.router.navigate([this.cachedURL]);

        return true;
      });
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.verifyLogin(url);
  }

  login(code: any, clientId: any, redirectURI: any, authEndpoint: any): Promise<any> {
    const body = {'code' : code, 'clientId' : clientId, 'redirectUri': redirectURI};

    return this._http.post(authEndpoint, body, {})
    .toPromise().then((r: Response) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', r.json().token);
      localStorage.setItem('user', JSON.stringify(r.json().user));
      this.user = r.json().user;
      return r.json();
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('cachedurl');
    localStorage.removeItem('provider');
     this.router.navigate([this.loginURI]);
  }

  verifyLogin(url): boolean {
    if (!this.isLoggedIn() && this.code == null && this.loginURI) {
      localStorage.setItem('cachedurl', url);
      this.router.navigate([this.loginURI]);

      return false;
    } else if (!this.isLoggedIn() && this.code == null && !this.loginURI) {
      localStorage.setItem('cachedurl', url);
      this.router.navigate(['login']);
    } else if (this.isLoggedIn()) {
      if (!this.user && localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      } else if (!this.user) {
        this.logout();
        this.router.navigate([this.loginURI]);
        return false;
      }

      return true;
    } else if (!this.isLoggedIn() && this.code != null) {
      const params = new URLSearchParams(this.location.path(false).split('?')[1]);

      if (params.get('code') && (localStorage.getItem('cachedurl') === '' || localStorage.getItem('cachedurl') === undefined || localStorage.getItem('cachedurl') === null)) {
        localStorage.setItem('cachedurl', this.location.path(false).split('?')[0]);
      }
      if (this.cachedURL != null || this.cachedURL !== '') {
        this.cachedURL = localStorage.getItem('cachedurl');
      }
    }
  }

  private isLoggedIn(): boolean {
    let status = false;

    if ( localStorage.getItem('isLoggedIn') === 'true') {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

  public auth(provider: string, authConfig: any): void {
    localStorage.setItem('authConfig', JSON.stringify(authConfig));
    localStorage.setItem('provider', provider);

    if (provider === 'linkedin' && !this.isLoggedIn()) {
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?client_id='
        + authConfig.linkedin.clientId
        + '&redirect_uri='
        + authConfig.linkedin.redirectURI
        + '&response_type=code';
    }

    if (provider === 'facebook' && !this.isLoggedIn()) {
       window.location.href = 'https: //www.facebook.com/v2.8/dialog/oauth?client_id='
         + authConfig.facebook.clientId
         + '&redirect_uri='
         + authConfig.facebook.redirectURI
         + '&scope=email';
    }

    if (provider === 'google' && !this.isLoggedIn()) {
       window.location.href = 'https: //accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id='
         + authConfig.google.clientId
         + '&redirect_uri='
         + authConfig.google.redirectURI
         + '&scope=email%20profile';
    } else {
        this.router.navigate([this.cachedURL]);
    }
  }
}
