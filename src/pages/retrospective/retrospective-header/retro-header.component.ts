import { Component } from '@angular/core';
import {AuthService} from "../../../providers/oauth/auth.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-retre-header',
  templateUrl: './retro-header.component.html',
  styleUrls: ['./retro-header.component.scss']
})
export class RetroHeaderComponent {
  public user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}
