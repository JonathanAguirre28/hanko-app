import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/pages/login/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postExercise(ejercicio: any, id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/ejercicios/${id}`, ejercicio, {
      headers,
    });
  }

  getExcercises() {
    return this.http.get(`${this.apiUrl}/ejercicios`);
  }

  getRutinasName() {
    return this.http.get(`${this.apiUrl}/rutina/catalog`);
  }
}
