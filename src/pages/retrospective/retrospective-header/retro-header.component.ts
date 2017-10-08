import { Component, Input } from '@angular/core';
import { AuthService } from '../../../providers/oauth/auth.service';
import { User } from '../../../models/user';
import { Retrospective } from '../../../models/retrospective';

@Component({
  selector: 'app-retre-header',
  templateUrl: './retro-header.component.html',
  styleUrls: ['./retro-header.component.scss']
})
export class RetroHeaderComponent {
  public user: User;
  public editing: boolean = false;
  @Input() retrospective: Retrospective;

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  editRetroTitle() {
    this.editing = true;
  }

  saveRetroTitle(newTitle: string) {
    this.retrospective.title = newTitle;
    this.editing = false;
  }

  logout() {
    this.authService.logout();
  }
}
