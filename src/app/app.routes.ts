import { Routes } from '@angular/router';
import { RetrospectiveComponent } from '@modules/retrospective/retrospective.component';
import { LoginComponent } from '@modules/login/login.component';
import { DashboardComponent } from '@modules/dashboard/dashboard.component';
import { AuthService } from '@services/auth/auth.service';
import { RetrospectiveResolverService } from '@resolvers/retrospective-resolver.service';
import { ListsResolverService } from '@resolvers/lists-resolver.service';
import { AuthGuard } from '@guards/auth.guard';
import { CustomComponent } from '@modules/custom/custom.component';
import { NoAuthGuard } from '@guards/no.auth.guard';

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
