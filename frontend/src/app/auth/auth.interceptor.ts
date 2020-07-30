import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthJWTToken) => {
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
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.authService.logout('firebase').subscribe();
              this.router.navigate(['auth/login']);
            }
            return throwError(error);
          }),
        );
      }),
    );
  }
}
