import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExercisesService } from './services/exercises.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddExerciseComponent } from './modal/add-exercise/add-exercise.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  dataSource: any = new MatTableDataSource<any>();
  constructor(
    private exercisesServices: ExercisesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.exercisesServices.getExcercises().subscribe({
      next: (res) => {
        this.dataSource = res;
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
        message: '¿Esta seguro que desea eliminar este ejercicio?',
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
