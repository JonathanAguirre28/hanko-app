import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExercisesService } from '../../services/exercises.service';
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

  catalogExercises: any = [];

  constructor(
    private exercisesService: ExercisesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getCatalog();
  }

  getCatalog(): void {
    this.exercisesService.getRutinasCatalog().subscribe({
      next: (res: any) => {
        this.catalogExercises = res;
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
        next: (res: any) => {
          this.openSnackBar(res.message);
          this.dialog.closeAll();
          this.exercisesService.refreshTable();
        },
        error: (e) => {
          this.openSnackBar(e.error.message);
        },
      });
    } else {
      this.exerciseForm.errors;
    }
  }

  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}
