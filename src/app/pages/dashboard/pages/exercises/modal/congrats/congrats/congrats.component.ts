import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {
  mensajeExito: boolean = false;
}
