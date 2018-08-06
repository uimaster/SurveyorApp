import {Observable} from 'rxjs/Observable';
import { LocalStorage } from '../../shared/localStorage';
import {Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse

} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoginService} from './login.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  public cachedRequests = [];

  constructor(private router: Router, public inj: Injector, public loaderInject: Injector) { }



  private applyCredentials = (req: HttpRequest<any>, token: string) => {
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'application/json, multipart/form-data, text/plain;charset=UTF-8',
        'X-Requested-With' : 'XMLHttpRequest',
        'DeviceType': '1'
      }
    });
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (req.headers.has(InterceptorSkipHeader)) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({headers}));
    }

    const auth = this.inj.get(LoginService);

    const authReq = this.applyCredentials(req, LocalStorage.getRefreshToken());

    return next.handle(authReq)

      .map((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {

          return event;

        }

      })

      .catch((error: any) => {

        if (error instanceof HttpErrorResponse) {

          if (error.status === 401) {

            console.log('Unauthorized');

            return auth.refreshToken()

              .flatMap((res) => {

                // localStorage.setItem('token', res.Data[0].bearerToken);
                LocalStorage.setRefreshToken(res.Data[0].BearerToken);

                return next.handle(this.applyCredentials(req, LocalStorage.getRefreshToken()));

              });

          } else if (error.status === 403) { // log back in!!

            this.router.navigate(['/login']);

          }

        } else {

          return Observable.throw(error);

        }

      });

  }
}
