import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public apiKey = '83d27870c4a84934b43d6c69a932daae';
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
