import { Component } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'retro-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  linkedinLogin() { this.authService.auth('linkedin'); }
}
