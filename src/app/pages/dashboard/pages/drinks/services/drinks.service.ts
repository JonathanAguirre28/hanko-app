import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  private apiUrl: string = environment.apiUrl;
  @Output() updateTable = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  getBebidas() {
    return this.http.get(`${this.apiUrl}/bebidas/`);
  }

  postBebidas(bebidas: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/bebidas/`, bebidas, {
      headers,
    });
  }

  refreshTable() {
    this.updateTable.emit();
  }
}