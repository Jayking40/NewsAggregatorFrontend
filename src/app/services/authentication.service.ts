import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.production';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = environment.baseURL;

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/login`, credentials)
      .pipe(
        tap(response => {
          this.isLoggedIn = true;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/register`, userData)
      .pipe(
        tap(response => {
          this.isLoggedIn = true;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  refreshToken(refreshToken: string): Observable<any> {
    const payload: any = {
      refreshToken,
    }
    return this.http.post(`${this.baseUrl}user/refreshToken`, payload)
  }

  favorite(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/favorite`, payload);
  }

  allFavorite(): Observable<any> {
    return this.http.get(`${this.baseUrl}user/allFavorites`);
  }
}
