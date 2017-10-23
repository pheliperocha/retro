import { Routes } from '@angular/router';
import { RetrospectiveComponent } from '../pages/retrospective/retrospective.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthService } from '../providers/oauth/auth.service';
import { RetrospectiveResolverService } from '../providers/resolvers/retrospective-resolver.service';
import { ListsResolverService } from '../providers/resolvers/lists-resolver.service';

export const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'retrospective/:id',
    component: RetrospectiveComponent,
    canActivate: [AuthService],
    resolve: {
      retrospective: RetrospectiveResolverService,
      lists: ListsResolverService
    }
  },
  {
    path: 'retrospective',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: '**',
    component: LoginComponent
  },
];
