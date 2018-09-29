import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { User } from '@models/user';
import { OAuthConfig } from '@config/settings';
import { HttpClient } from '@angular/common/http';
import { UserAuthToken } from '@interfaces/UserAuthToken';

@Injectable()
export class AuthService implements CanActivate {
  private user: User;
  private token: string;

  private code: string;
  private cachedURL: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.user = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;
    this.token = (localStorage.getItem('token')) ? localStorage.getItem('token') : null;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    const url: string = state.url;
    const params = new URLSearchParams(url.split('?')[1]);
    this.code = params.get('code');

    if (this.code) {
      this.cachedURL = (localStorage.getItem('cachedURL')) ? localStorage.getItem('cachedURL') : '/dashboard';

      return this.loginOAuth(this.code).then(() => {
        this.router.navigate([this.cachedURL]);
        return true;
      }).catch(() => {
        this.router.navigate(['/login']);
        return false;
      });
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  public getUser(): User {
    return this.user;
  }

  public getToken(): string {
    return this.token;
  }

  private loginOAuth(code: string): Promise<UserAuthToken> {
    const body = {
      'code' : code,
      'clientId': OAuthConfig.linkedin.clientId,
      'redirectUri': OAuthConfig.linkedin.redirectURI
    };

    return this.http.post(OAuthConfig.linkedin.authEndpoint, body, {})
      .toPromise().then((r: UserAuthToken) => {
        localStorage.setItem('token', r.token);
        localStorage.setItem('user', JSON.stringify(r.user));
        this.user = r.user;
        this.token = r.token;
        return r;
      }).catch(this.handleError);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cachedURL');
    localStorage.removeItem('provider');
    this.user = null;
    this.token = null;
    this.cachedURL = null;
    this.router.navigate(['login']);
  }

  public isLoggedIn(): boolean {
    return (this.token && this.user && this.user.id > 0);
  }

  public auth(provider: string): void {
    localStorage.setItem('provider', provider);

    if (provider === 'linkedin' && !this.isLoggedIn()) {
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?client_id='
        + OAuthConfig.linkedin.clientId
        + '&redirect_uri='
        + OAuthConfig.linkedin.redirectURI
        + '&response_type=code';
      return;
    } else {
      this.router.navigate([this.cachedURL]);
    }
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
