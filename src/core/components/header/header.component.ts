import { Component, Input } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public user: User;
  @Input() sidenav: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}
