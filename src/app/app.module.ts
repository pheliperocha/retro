// Core Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, XHRBackend, RequestOptions  } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatStepperModule } from '@angular/material';

// Modules
import { OAuthModule } from '../providers/oauth/oauth.module';

// Services
import { appRoutes } from './app.routes';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RetrospectiveComponent,
    HeaderComponent,
    RetrospectiveThumbComponent,
    ListComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FlexLayoutModule,
    OAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    MdButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
