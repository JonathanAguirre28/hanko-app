import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddClientsComponent } from './modal/add-clients/add-clients.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from './services/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = [
    'active',
    'fullName',
    'age',
    'dateOfBirth',
    'dateOfInscription',
    'phone',
    'emergencyNumber',
    'email',
    'nextDueDate',
    'deleteEdit',
  ];
  dialogRef: any;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  constructor(
    private clientsService: ClientsService,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDataTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDataTable() {
    this.clientsService.getClients().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator; // Set the paginator initially
        this.dataSource.sort = this.sort;
        this.paginator.pageSize = 5; // You can set the initial page size here if needed
      },
    });
  }

  createClients() {
    const dialog = this.dialog.open(AddClientsComponent, {
      data: {
        closeModal: () => this.dialog.closeAll(),
      },
    });
    dialog.afterClosed().subscribe((result) => {
      this.getDataTable();

    });
  }

  editClients(data: any) {
    const dialog = this.dialog.open(AddClientsComponent, {
      data: {
        data: data,
        closeModal: () => this.dialog.closeAll(),
      },
    });

    dialog.afterClosed().subscribe((result: any) => {
      this.getDataTable();
    });
  }

  deleteClients(data: any) {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {
        message: '¿Esta seguro que desea eliminar este cliente?',
        button1Text: 'Cancelar',
        button2Text: 'Aceptar',
        button1Action: () => {
          this.dialogRef.close();
        },
        button2Action: () => {
          this.functionDeleteClients(data.id)
        },
      },
    });
  }

  functionDeleteClients(id: string) {
    this.clientsService.deleteClients(id).subscribe({
      next: (res: any) => {
        this.getDataTable();
        this.dialogRef.close();
        this.openSnackBar(res.message);
      },
    });
  }
  
  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}


