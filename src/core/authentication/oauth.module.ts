import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { InterceptorService } from 'ng2-interceptors';
import { XHRBackend, RequestOptions } from '@angular/http';
import { ServerURLInterceptor } from '../interceptors/interceptor';
import { AuthGuard } from '../guards/auth.guard';

export function interceptorFactory(
  xhrBackend: XHRBackend,
  requestOptions: RequestOptions,
  serverURLInterceptor: ServerURLInterceptor
) {
  const service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(serverURLInterceptor);
  return service;
}

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [
      AuthService,
      AuthGuard,
      ServerURLInterceptor,
      {
        provide: InterceptorService,
        useFactory: interceptorFactory,
        deps: [XHRBackend, RequestOptions, ServerURLInterceptor]
      }
    ]
})
export class OAuthModule {}
