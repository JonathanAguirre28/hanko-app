import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LecturaComponent {
  lecturaForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    instalacion: new FormControl('', [Validators.required]),
  });




}

