import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [
      AuthService,
      AuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    ]
})
export class OAuthModule {}
