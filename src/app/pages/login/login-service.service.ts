import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postLogin(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/users`, user, { headers });
  }
}
