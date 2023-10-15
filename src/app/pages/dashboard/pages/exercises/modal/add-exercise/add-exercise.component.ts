import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExercisesService } from '../../services/exercises.service';
import { CongratsComponent } from '../congrats/congrats/congrats.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
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
    Tipo: new FormControl('', [Validators.required]),
  });

  constructor(
    private exercisesService: ExercisesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCatalogRutines();
  }

  getCatalogRutines(): void {}

  onSubmit() {
    if (this.exerciseForm.valid) {
      const EjercioName = this.exerciseForm.get('EjercioName')?.value;
      const Series = this.exerciseForm.get('Series')?.value;
      const Repeticiones = this.exerciseForm.get('Repeticiones')?.value;
      const Descripcion = this.exerciseForm.get('Descripcion')?.value;
      const Tipo = this.exerciseForm.get('Tipo')?.value;
      const ejercicio = {
        ejercicioName: EjercioName || '',
        series: Series || '',
        repeticiones: Repeticiones || '',
        descripcion: Descripcion || '',
        tipo: Tipo || '',
      };

      this.exercisesService.postExercise(ejercicio, '4').subscribe({
        next: () => {
          this.dialog.open(CongratsComponent);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
