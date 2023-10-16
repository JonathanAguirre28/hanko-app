import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DrinksService } from '../../services/drinks.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-drinks',
  templateUrl: './add-drinks.component.html',
  styleUrls: ['./add-drinks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddDrinksComponent implements OnInit {
  drinksForm = new FormGroup({
    BebidaName: new FormControl('', [Validators.required]),
    Tipo: new FormControl('', [Validators.required]),
    Precio: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    Stock: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    Descripcion: new FormControl('', [Validators.required]),
  });

  constructor(
    private drinksService: DrinksService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}

  closeModal(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (this.drinksForm.valid) {
      const BebidaName = this.drinksForm.get('BebidaName')?.value;
      const Tipo = this.drinksForm.get('Tipo')?.value;
      const Precio = this.drinksForm.get('Precio')?.value;
      const Stock = this.drinksForm.get('Stock')?.value;
      const Descripcion = this.drinksForm.get('Descripcion')?.value || '';
      const bebida = {
        bebidaName: BebidaName || '',
        tipo: Tipo || '',
        precio: Precio || '',
        stock: Stock || '',
        descripcion: Descripcion || '',
      };

      this.drinksService.postBebidas(bebida).subscribe({
        next: (res: any) => {
          this.openSnackBar(res.message);
          this.dialog.closeAll();
          this.drinksService.refreshTable();
        },
        error: (e) => {
          this.openSnackBar(e.error.message);
        },
      });
    } else {
      this.drinksForm.errors;
    }
  }
  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}
