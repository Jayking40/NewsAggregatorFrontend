import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { AuthenticationService } from '../app/services/authentication.service';
import { SetAccessToken } from '../store/app.action';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  token: any;
  refreshToken: any;
  userId: any

  @Select(AppState.getAccessToken) token$: Observable<string> | undefined;
  @Select(AppState.getUserData) userId$: Observable<any> | undefined;
  @Select(AppState.getRefreshToken) refreshToken$: Observable<string> | undefined;
  constructor(
    private router: Router,
    private store: Store,
    public authService: AuthenticationService,
  ) {
    this.refreshToken$?.subscribe(res => {
      this.refreshToken = res;
    });
    this.userId$?.subscribe(res => {
      this.userId = res
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token$?.subscribe(res => {
      this.token = res;
      if (res) {
        request = TokenInterceptor.addToken(request, res)
      }
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              if (event.body.code === 401) {
                this.router.navigate(['/login']).then();
              }
          }
          return event;
      }),
      catchError(error => {
        if (!request.url.includes('auth/token')) {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            // this.store.dispatch(new SetIsNetworkRequestOngoing(false));
            return this.handle401Error(request, next);
          } else {
            // this.store.dispatch(new SetIsNetworkRequestOngoing(false));
            return throwError(error);
          }
        } else {
          // this.store.dispatch(new SetIsNetworkRequestOngoing(false));
          return next.handle(request);
        }
      })
    );
  }

  private static addToken(request: HttpRequest<any>, token: string): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken(this.refreshToken).pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access_token);
          if (token.access) {
            this.store.dispatch(new SetAccessToken(token.access_token));
          }
          return next.handle(TokenInterceptor.addToken(request, token.access_token));
        }));
      } else {
        return this.refreshTokenSubject.pipe(
          filter(token => {
            this.router.navigate(['/login']).then();
            return token != null;
          }),
          take(1),
          switchMap(jwt => {
            return next.handle(TokenInterceptor.addToken(request, jwt));
          }));
      }
  }
}
