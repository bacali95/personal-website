import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/switchMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: NbAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken()
      .switchMap((token: NbAuthJWTToken) => {
        if (token) {
          const JWT = `Bearer ${token.getValue()}`;
          req = req.clone({
            setHeaders: {
              Authorization: JWT,
            },
          });
        }
        return next.handle(req);
      });
  }
}
