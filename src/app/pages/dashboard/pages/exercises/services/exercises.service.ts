import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRutinas() {
    return this.http.get(`${this.apiUrl}/rutina`);
  }
}
