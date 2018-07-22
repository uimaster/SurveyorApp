import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// import { LoginService } from './login.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // private loginService: LoginService;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(request.clone({headers}));
    }

    // this.loginService = this.injector.get(LoginService);
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'DeviceType': '1'
        }
      });
    }
    return next.handle(request);
  }
}
