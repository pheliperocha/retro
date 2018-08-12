// Core Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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
import { OAuthModule } from '../providers/oauth/oauth.module';
import { DragulaModule } from 'ng2-dragula';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

// Services
import { appRoutes } from './app.routes';
import { ApiService } from '../providers/api/api.service';
import { RetrospectiveResolverService } from '../providers/resolvers/retrospective-resolver.service';
import { ListsResolverService } from '../providers/resolvers/lists-resolver.service';
import { RetrospectiveService } from '../providers/retrospective.service';
import { environment } from '../environments/environment';


// Directives

// Components
import { AppComponent } from './app.component';
import { RetrospectiveComponent } from '../pages/retrospective/retrospective.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HeaderComponent } from '../shared/header/header.component';
import { RetrospectiveThumbComponent } from '../shared/retrospective-thumb/retrospective-thumb.component';
import { ListComponent } from '../shared/list/list.component';
import { CardComponent } from '../shared/card/card.component';
import { RetroHeaderComponent } from '../pages/retrospective/retrospective-header/retro-header.component';
import { DeleteDialogComponent } from '../shared/dialogs/delete-dialog.component';
import { CreateCardDialogComponent } from '../shared/dialogs/createCard-dialog.component';
import { ContextDialogComponent } from '../shared/dialogs/context-dialog.component';
import { CreateRetrospectiveComponent } from '../pages/create-retrospective/create-retrospective.component';
import { ReflexaoComponent } from '../pages/retrospective/reflexao/reflexao.component';
import { MyActionsComponent } from '../shared/my-actions/myActions.component';
import { AnnotationComponent } from '../shared/annotation/annotation.component';

// Pipes
import { RemoveIntersectionPipe } from './remove-intersection.pipe';

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
    RemoveIntersectionPipe
  ],
  entryComponents: [ DeleteDialogComponent, CreateCardDialogComponent, ContextDialogComponent, CreateRetrospectiveComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
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
    RetrospectiveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
