import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private session: SessionStorageService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = req.clone({
            setHeaders: {
                Authorization: `${this.session.getToken()}`
            }
        });
        return next.handle(request).pipe(
            catchError(error => {
                if (error.status == 401) {
                    this.authService.logout();
                    this.router.navigateByUrl("/login");
                }
                return throwError(() => error);
            })
        );
    }
}
