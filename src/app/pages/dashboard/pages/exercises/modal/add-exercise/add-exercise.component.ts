import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent {
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
}
