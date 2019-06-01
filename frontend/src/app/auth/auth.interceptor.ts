import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/switchMap';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: NbAuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken()
      .switchMap((token: NbAuthJWTToken) => {
        if (token && token.isValid()) {
          const JWT = `Bearer ${token.getValue()}`;
          req = req.clone({
            setHeaders: {
              Authorization: JWT,
            },
          });
        } else {
          this.router.navigate(['auth/login']);
        }
        return next.handle(req);
      });
  }
}
