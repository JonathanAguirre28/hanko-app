import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExercisesService } from '../../services/exercises.service';
import { CongratsComponent } from '../congrats/congrats/congrats.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddExerciseComponent implements OnInit {
  exerciseForm = new FormGroup({
    EjercioName: new FormControl('', [Validators.required]),
    Series: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    Repeticiones: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    Descripcion: new FormControl('', [Validators.required]),
    Id: new FormControl('', [Validators.required]),
  });

  toppingList: any = [];

  constructor(
    private exercisesService: ExercisesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.exercisesService.getRutinasName().subscribe({
      next: (res: any) => {
        this.toppingList = res;
      },
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      const EjercioName = this.exerciseForm.get('EjercioName')?.value;
      const Series = this.exerciseForm.get('Series')?.value;
      const Repeticiones = this.exerciseForm.get('Repeticiones')?.value;
      const Descripcion = this.exerciseForm.get('Descripcion')?.value;
      const Id = this.exerciseForm.get('Id')?.value || '';
      const ejercicio = {
        ejercicioName: EjercioName || '',
        series: Series || '',
        repeticiones: Repeticiones || '',
        descripcion: Descripcion || '',
      };

      this.exercisesService.postExercise(ejercicio, Id).subscribe({
        next: () => {
          this.dialog.open(CongratsComponent);
        },
        error: (e) => {
          this.openSnackBar(e.error.message);
        },
      });
    }
  }

  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}
