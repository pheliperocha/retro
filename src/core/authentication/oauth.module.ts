import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { NoAuthGuard } from '../guards/no.auth.guard';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [
      AuthService,
      AuthGuard,
      NoAuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    ]
})
export class OAuthModule {}
