import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string = environment.apiUrl;
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  postLogin(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/users`, user, { headers });
  }

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // Marca al usuario como autenticado
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  setLogout() {
    this.loggedIn = false;
  }
}
