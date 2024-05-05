import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public apiKey = 'f1a920a2971849118c21215a449744d0';
  public apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) { }

  // Fetch top headlines
  getTopHeadlines(pageNumber: number, pageSize: number): Observable<any> {
    const url = `${this.apiUrl}/top-headlines?country=us&apiKey=${this.apiKey}&page=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  // Fetch articles by keyword
  getArticlesByKeyword(keyword: string, pageNumber?: number, pageSize?: number): Observable<any> {
    const url = `${this.apiUrl}/everything?q=${keyword}&apiKey=${this.apiKey}&page=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

}
