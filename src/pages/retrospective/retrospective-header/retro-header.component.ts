import { Component, Input } from '@angular/core';
import { AuthService } from '../../../providers/oauth/auth.service';
import { User } from '../../../models/user';
import { Retrospective } from '../../../models/retrospective';
import {MdDialog} from "@angular/material";
import {ContextDialogComponent} from "../../../shared/dialogs/context-dialog.component";

@Component({
  selector: 'app-retre-header',
  templateUrl: './retro-header.component.html',
  styleUrls: ['./retro-header.component.scss']
})
export class RetroHeaderComponent {
  public user: User;
  public editing: boolean = false;
  @Input() retrospective: Retrospective;

  constructor(private authService: AuthService, public contextDialog: MdDialog) {
    this.user = this.authService.user;
  }

  openRetroContext() {
    let dialogRef = this.contextDialog.open(ContextDialogComponent, {
      data: { context: this.retrospective.context, retroState: this.retrospective.state }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrospective.context = result;
      }
    });
  }

  editRetroTitle(editing: boolean) {
    this.editing = editing;
  }

  saveRetroTitle(newTitle: string) {
    this.retrospective.title = newTitle;
    this.editing = false;
  }

  logout() {
    this.authService.logout();
  }
}
