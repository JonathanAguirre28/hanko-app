import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddClientsComponent } from './modal/add-clients/add-clients.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  constructor ( private matDialog: MatDialog){}

  displayedColumns: string[] = [
    'position', 
    'name', 
    'surname', 
    'tel'
  ];
  dialog: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  createClients(): void {
    this.matDialog.open(AddClientsComponent);
  }
  
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


