import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = ['position', 'name', 'surname', 'tel'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Jonathan', surname: 'Aguirre', tel: 1100546598},
  {position: 2, name: 'Felipe', surname: 'Ramos', tel: 1100546598},
  {position: 3, name: 'Gustavo', surname: 'Ramos', tel: 1100546598},

];

export interface PeriodicElement {
  name: string;
  position: number;
  surname: string;
  tel: number;
}
