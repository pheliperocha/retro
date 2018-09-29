import { Component, Input } from '@angular/core';
import { User } from '@models/user';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'retro-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public user: User;
  @Input() sidenav: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
