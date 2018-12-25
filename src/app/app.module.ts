import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatCardModule,
  MatDialogModule,
  MatStepperModule,
  MatMenuModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatInputModule,
  MatSidenavModule,
  MatExpansionModule,
} from '@angular/material';

import { DragulaModule } from 'ng2-dragula';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { RetrospectiveResolverService } from '@resolvers/retrospective-resolver.service';
import { ListsResolverService } from '@resolvers/lists-resolver.service';
import { RetrospectiveService } from '@services/retrospective.service';
import { AppComponent } from './app.component';
import { RetrospectiveComponent } from '@modules/retrospective/retrospective.component';
import { LoginComponent } from '@modules/login/login.component';
import { DashboardComponent } from '@modules/dashboard/dashboard.component';
import { RetroHeaderComponent } from '@modules/retrospective/retrospective-header/retro-header.component';
import { CreateRetrospectiveComponent } from '@modules/create-retrospective/create-retrospective.component';
import { ReflexaoComponent } from '@modules/retrospective/reflexao/reflexao.component';
import { DeleteDialogComponent } from '@components/dialogs/delete-dialog.component';
import { CreateCardDialogComponent } from '@components/dialogs/createCard-dialog.component';
import { ContextDialogComponent } from '@components/dialogs/context-dialog.component';
import { MyActionsComponent } from '@components/my-actions/myActions.component';
import { AnnotationComponent } from '@components/annotation/annotation.component';
import { HeaderComponent } from '@components/header/header.component';
import { RetrospectiveThumbComponent } from '@components/retrospective-thumb/retrospective-thumb.component';
import { CardComponent } from '@components/card/card.component';
import { ListComponent } from '@components/list/list.component';
import { CustomComponent } from '@modules/custom/custom.component';
import { RemoveIntersectionPipe } from '@pipes/remove-intersection.pipe';
import { environment } from '@config/environments/environment';
import { CookieService } from '@services/cookie.service';
import { OAuthModule } from '@services/auth/oauth.module';
import { ApiService } from '@services/api.service';

const socketConfig: SocketIoConfig = { url: environment.apiUrl, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RetrospectiveComponent,
    HeaderComponent,
    RetroHeaderComponent,
    RetrospectiveThumbComponent,
    ListComponent,
    CardComponent,
    DeleteDialogComponent,
    CreateCardDialogComponent,
    ContextDialogComponent,
    CreateRetrospectiveComponent,
    ReflexaoComponent,
    MyActionsComponent,
    AnnotationComponent,
    RemoveIntersectionPipe,
    CustomComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
    CreateCardDialogComponent,
    ContextDialogComponent,
    CreateRetrospectiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    OAuthModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule,
    SwiperModule,
    SocketIoModule.forRoot(socketConfig),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule,
  ],
  providers: [
    ApiService,
    RetrospectiveResolverService,
    ListsResolverService,
    RetrospectiveService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
