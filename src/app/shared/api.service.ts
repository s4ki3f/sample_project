// shared/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-API-Key': this.apiKey
    });
  }

  postUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() })
      .pipe(map((res: any) => res));
  }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(map((res: any) => res));
  }

  updateUser(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() })
      .pipe(map((res: any) => res));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(map((res: any) => res));
  }
}
