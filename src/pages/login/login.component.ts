import { Component } from '@angular/core';
import { AuthService } from '../../providers/oauth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authApiBaseUrl = 'http://localhost:5000';
  private authWebBaseUrl = 'http://localhost:4200';

  public config = {
    'loginRoute': 'login',
    'linkedin': {
      'authEndpoint': this.authApiBaseUrl + '/auth/linkedin',
      'clientId': '77m7ad7n38rroh',
      'redirectURI' : this.authWebBaseUrl + '/dashboard'
    },
    'facebook': {
      'authEndpoint': this.authApiBaseUrl + '/auth/facebook',
      'clientId': '',
      'redirectURI' : this.authWebBaseUrl + '/dashboard'
    },
    'google': {
      'authEndpoint': this.authApiBaseUrl + '/auth/google',
      'clientId': '',
      'redirectURI' : this.authWebBaseUrl + '/dashboard'
    }
  };

  constructor(public authService: AuthService) {}

  linkedinLogin() {
    this.authService.auth('linkedin', this.config);
  }
}
