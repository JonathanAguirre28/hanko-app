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
    ejercicioName: new FormControl('', [Validators.required]),
    series: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    repeticiones: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    descripcion: new FormControl('', [Validators.required]),
    rutinaName: new FormControl('', [Validators.required]),
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
    this.isEdit();
    this.setData();
  }

  isEdit(): boolean {
    if (this.data.data) {
      return true;
    } else {
      return false;
    }
  }

  setData(): void {
    console.log(this.data.data);
    if (this.isEdit()) {
      this.exerciseForm
        .get('ejercicioName')
        ?.setValue(this.data.data.ejercicioName);
      this.exerciseForm.get('series')?.setValue(this.data.data.series);
      this.exerciseForm
        .get('repeticiones')
        ?.setValue(this.data.data.repeticiones);
      this.exerciseForm
        .get('descripcion')
        ?.setValue(this.data.data.descripcion);
    }
  }

  getCatalog(): void {
    this.exercisesService.getRutinasCatalog().subscribe({
      next: (res: any) => {
        this.catalogExercises = res;
        if (this.data.data?.rutinaName) {
          res.find((item: any) => {
            if (item.titulo === this.data.data.rutinaName) {
              this.exerciseForm.get('rutinaName')?.setValue(item.id);
            }
          });
        }
      },
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      const ejercioName = this.exerciseForm.get('ejercicioName')?.value;
      const series = this.exerciseForm.get('series')?.value;
      const repeticiones = this.exerciseForm.get('repeticiones')?.value;
      const descripcion = this.exerciseForm.get('descripcion')?.value;
      const id = this.exerciseForm.get('rutinaName')?.value || '';
      const ejercicio = {
        ejercicioName: ejercioName,
        series: series,
        repeticiones: repeticiones,
        descripcion: descripcion,
      };

      if (this.isEdit()) {
        this.exercisesService
          .patchExercise(ejercicio, this.data.data.id)
          .subscribe({
            next: (res: any) => {
              this.openSnackBar(res.message);
              this.dialog.closeAll();
            },
            error: (e) => {
              this.openSnackBar(e.error.message);
            },
          });
      } else {
        this.exercisesService.postExercise(ejercicio, id).subscribe({
          next: (res: any) => {
            this.openSnackBar(res.message);
            this.dialog.closeAll();
          },
          error: (e) => {
            this.openSnackBar(e.error.message);
          },
        });
      }
    } else {
      this.exerciseForm.errors;
    }
  }

  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}
