import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl: string = environment.apiUrl;
  @Output() updateTable = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(`${this.apiUrl}/clientes`);
  }

  postClients(cliente: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/clientes`, cliente , {
      headers,
    });
  }

  patchClients(cliente: any, id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.apiUrl}/clientes/${id}`, cliente, {
      headers,
    });
  }

  deleteClients(id: string) {
    return this.http.delete(`${this.apiUrl}/clientes/${id}`,);
  }

  refreshTable() {
    this.updateTable.emit();
  }
}
