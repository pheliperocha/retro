// Core Angular
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

// Modules
import { OAuthModule } from '../core/authentication/oauth.module';
import { DragulaModule } from 'ng2-dragula';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HttpClientModule } from '@angular/common/http';

// Services
import { appRoutes } from './app.routes';
import { ApiService } from '../core/http/api.service';
import { RetrospectiveResolverService } from '../core/resolvers/retrospective-resolver.service';
import { ListsResolverService } from '../core/resolvers/lists-resolver.service';
import { RetrospectiveService } from '../core/services/retrospective.service';

// Directives

// Components
import { AppComponent } from './app.component';
import { RetrospectiveComponent } from '../pages/retrospective/retrospective.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { RetroHeaderComponent } from '../pages/retrospective/retrospective-header/retro-header.component';
import { CreateRetrospectiveComponent } from '../pages/create-retrospective/create-retrospective.component';
import { ReflexaoComponent } from '../pages/retrospective/reflexao/reflexao.component';
import { DeleteDialogComponent } from '../core/components/dialogs/delete-dialog.component';
import { CreateCardDialogComponent } from '../core/components/dialogs/createCard-dialog.component';
import { ContextDialogComponent } from '../core/components/dialogs/context-dialog.component';
import { MyActionsComponent } from '../core/components/my-actions/myActions.component';
import { AnnotationComponent } from '../core/components/annotation/annotation.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { RetrospectiveThumbComponent } from '../core/components/retrospective-thumb/retrospective-thumb.component';
import { CardComponent } from '../core/components/card/card.component';
import { ListComponent } from '../core/components/list/list.component';
import { CustomComponent } from '../pages/custom/custom.component';

// Pipes
import { RemoveIntersectionPipe } from '../core/pipes/remove-intersection.pipe';

// Others
import { environment } from '../config/environments/environment';

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
