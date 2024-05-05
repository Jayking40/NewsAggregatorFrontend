import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment.staging';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/login`, credentials);
  }

  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/register`, userData);
  }

  refreshToken(refreshToken: string): Observable<any> {
    const payload: any = {
      refreshToken,
    }
    return this.http.post(`${this.baseUrl}user/refresh`, payload)
  }

  favorite(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/favorite`, payload);
  }
}
