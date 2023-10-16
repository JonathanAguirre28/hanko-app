import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {
  mensajeExito: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  closeConfirmationModal(): void {
    this.dialogRef.close();
  }

}
