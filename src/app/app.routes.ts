import { Routes } from '@angular/router';
import { RetrospectiveComponent } from '../pages/retrospective/retrospective.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthService } from '../core/authentication/auth.service';
import { RetrospectiveResolverService } from '../core/resolvers/retrospective-resolver.service';
import { ListsResolverService } from '../core/resolvers/lists-resolver.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { CustomComponent } from '../pages/custom/custom.component';
import { NoAuthGuard } from '../core/guards/no.auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'auth',
    component: CustomComponent,
    canActivate: [AuthService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'retrospective/:id',
    component: RetrospectiveComponent,
    canActivate: [AuthGuard],
    resolve: {
      retrospective: RetrospectiveResolverService,
      lists: ListsResolverService
    }
  },
  {
    path: 'retrospective',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent
  },
];
