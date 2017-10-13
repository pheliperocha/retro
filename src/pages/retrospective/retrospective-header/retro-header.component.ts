import { Component, Input } from '@angular/core';
import { AuthService } from '../../../providers/oauth/auth.service';
import { User } from '../../../models/user';
import { Retrospective } from '../../../models/retrospective';
import { MdDialog } from '@angular/material';
import { ContextDialogComponent } from '../../../shared/dialogs/context-dialog.component';
import { ApiService } from '../../../providers/api/api.service';

@Component({
  selector: 'app-retre-header',
  templateUrl: './retro-header.component.html',
  styleUrls: ['./retro-header.component.scss']
})
export class RetroHeaderComponent {
  public user: User;
  public editing: boolean = false;
  @Input() retrospective: Retrospective;

  constructor(private authService: AuthService,
              public contextDialog: MdDialog,
              private apiService: ApiService) {
    this.user = this.authService.user;
  }

  openRetroContext() {
    let dialogRef = this.contextDialog.open(ContextDialogComponent, {
      data: { context: this.retrospective.context, retroState: this.retrospective.state }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateRetroContext(result);
      }
    });
  }

  editRetroTitle(editing: boolean) {
    this.editing = editing;
  }

  saveRetroTitle(newTitle: string) {
    let update = {
      'op': 'replace',
      'path': 'title',
      'value': newTitle
    };

    this.apiService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response === true) {
        this.retrospective.title = newTitle;
        this.editing = false;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  updateRetroContext(newContext: string) {
    let update = {
      'op': 'replace',
      'path': 'context',
      'value': newContext
    };

    this.apiService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response === true) {
        this.retrospective.context = newContext;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  logout() {
    this.authService.logout();
  }
}
