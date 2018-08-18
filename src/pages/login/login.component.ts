import { Component } from '@angular/core';
import { AuthService } from '../../core/authentication/auth.service';
import { environment } from '../../config/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authApiBaseUrl = environment.apiUrl;
  private authWebBaseUrl = environment.appUrl;

  public config = {
    'loginRoute': 'login',
    'linkedin': {
      'authEndpoint': this.authApiBaseUrl + 'auth/linkedin',
      'clientId': '77m7ad7n38rroh',
      'redirectURI' : this.authWebBaseUrl + 'dashboard'
    },
    'facebook': {
      'authEndpoint': this.authApiBaseUrl + 'auth/facebook',
      'clientId': '',
      'redirectURI' : this.authWebBaseUrl + 'dashboard'
    },
    'google': {
      'authEndpoint': this.authApiBaseUrl + 'auth/google',
      'clientId': '',
      'redirectURI' : this.authWebBaseUrl + 'dashboard'
    }
  };

  constructor(private authService: AuthService) {}

  linkedinLogin() {
    this.authService.auth('linkedin', this.config);
  }
}
