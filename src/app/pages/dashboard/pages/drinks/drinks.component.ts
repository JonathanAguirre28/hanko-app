import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DrinksService } from './services/drinks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDrinksComponent } from './modal/add-drinks/add-drinks.component';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DrinksComponent implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'tipo',
    'precio',
    'stock',
    'descripcion',
    'deleteEdit',
  ];
  dialogRef: any;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();

  constructor(private drinksService: DrinksService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.drinksService.getBebidas().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator; // Set the paginator initially
        this.dataSource.sort = this.sort;
        this.paginator.pageSize = 5; // You can set the initial page size here if needed
      },
    });
  }
  createDrinks() {
    const dialog = this.dialog.open(AddDrinksComponent, {
      data: {
        closeModal: () => this.dialog.closeAll(),
      },
    });
    dialog.afterClosed().subscribe((result) => {
      this.getBebidas();
    });
  }

  getBebidas(): void {
    this.drinksService.getBebidas().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.dataSource = new MatTableDataSource<any>(res);
        } else {
          this.dataSource = new MatTableDataSource<any>([res]);
        }
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  editDrink(data: any) {
    const dialog = this.dialog.open(AddDrinksComponent, {
      data: {
        data: data,
        closeModal: () => this.dialog.closeAll(),
      },
    });

    dialog.afterClosed().subscribe((result) => {
      this.getBebidas();
    });
  }

  deleteDrink(data: any) {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {
        message: '¿Esta seguro que desea eliminar esta bebida?',
        button1Text: 'Cancelar',
        button2Text: 'Aceptar',
        button1Action: () => {
          this.dialogRef.close();
        },
        button2Action: () => {
          this.functionDeleteDrink(data.id)
        },
      },
    });
  }

  functionDeleteDrink(id: string) {
    this.drinksService.deleteDrink(id).subscribe({
      next: (res: any) => {
        this.getBebidas();
        this.dialogRef.close();
        this.openSnackBar(res.message);
      },
    });
  }

  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}

