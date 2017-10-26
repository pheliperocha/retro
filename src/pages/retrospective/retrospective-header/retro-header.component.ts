import { Component, Input } from '@angular/core';
import { AuthService } from '../../../providers/oauth/auth.service';
import { User } from '../../../models/user';
import { Retrospective } from '../../../models/retrospective';
import { MdDialog } from '@angular/material';
import { ContextDialogComponent } from '../../../shared/dialogs/context-dialog.component';
import { RetrospectiveService } from '../../../providers/retrospective.service';
import { AppSettings } from '../../../app/app.settings';

@Component({
  selector: 'app-retre-header',
  templateUrl: './retro-header.component.html',
  styleUrls: ['./retro-header.component.scss']
})
export class RetroHeaderComponent {
  public user: User;
  public appSettings = AppSettings;
  public editing: boolean = false;
  @Input() retrospective: Retrospective;

  constructor(private authService: AuthService,
              public contextDialog: MdDialog,
              private retrospectiveService: RetrospectiveService) {
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
      'nome': newTitle
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.title = newTitle;
        this.editing = false;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  updateRetroContext(newContext: string) {
    let update = {
      'contexto': newContext
    };

    this.retrospectiveService.updateRetrospective(this.retrospective.id, update).then(response => {
      if (response.updated === true) {
        this.retrospective.context = newContext;
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
