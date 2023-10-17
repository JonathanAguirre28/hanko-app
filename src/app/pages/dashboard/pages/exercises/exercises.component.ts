import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ExercisesService } from './services/exercises.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddExerciseComponent } from './modal/add-exercise/add-exercise.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExercisesComponent implements OnInit {
  displayedColumns: string[] = [
    'rutina',
    'nombre',
    'series',
    'repeticiones',
    'descripcion',
    'deleteEdit',
  ];
  dialogRef: any;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();


  constructor(
    private exercisesServices: ExercisesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

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
    this.dataSource.paginator = this.paginator; // Set the paginator initially
    this.dataSource.sort = this.sort;
    this.paginator.pageSize = 5; // You can set the initial page size here if needed
    this.getExercises();
  }


  getExercises(): void {
    this.exercisesServices.getExcercises().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.dataSource = new MatTableDataSource<any>(res);
        } else {
          // If the data is not an array, convert it to an array of objects
          this.dataSource = new MatTableDataSource<any>([res]);
        }
        this.dataSource.paginator = this.paginator; // Set the paginator after loading data
      },
    });
  }

  createExercise() {
    const dialog = this.dialog.open(AddExerciseComponent, {
      data: {
        closeModal: () => this.dialog.closeAll(),
      },
    });

    dialog.afterClosed().subscribe((result) => {
      this.getExercises();
    });
  }

  editExercise(data: any) {
    const dialog = this.dialog.open(AddExerciseComponent, {
      data: {
        data: data,
        closeModal: () => this.dialog.closeAll(),
      },
    });

    dialog.afterClosed().subscribe((result) => {
      this.getExercises();
    });
  }

  deleteExercise(data: any) {
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
          this.fuctionDeleteExercise(data.id)
        },
      },
    });
  }

  fuctionDeleteExercise(id: string) {
    this.exercisesServices.deleteExercise(id).subscribe({
      next: (res: any) => {
        this.getExercises();
        this.dialogRef.close();
        this.openSnackBar(res.message);
      },
    });
  }

  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}
