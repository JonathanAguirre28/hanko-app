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
    bebidaName: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    precio: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    stock: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    descripcion: new FormControl('', [Validators.required]),
  });

  // catalogDrinks: any = [];

  constructor(
    private drinksService: DrinksService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.isEdit();
    this.setData();
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  isEdit(): boolean {
    if (this.data.data) {
      return true;
    } else {
      return false;
    }
  }

  setData(): void {
    if (this.isEdit()) {
      this.drinksForm
        .get('bebidaName')
        ?.setValue(this.data.data.bebidaName);
      this.drinksForm.get('tipo')?.setValue(this.data.data.tipo);
      this.drinksForm
        .get('precio')
        ?.setValue(this.data.data.precio);
      this.drinksForm
        .get('stock')
        ?.setValue(this.data.data.stock);
      this.drinksForm
        .get('descripcion')
        ?.setValue(this.data.data.descripcion);
    }
  }

  onSubmit() {
    if (this.drinksForm.valid) {
      const bebidaName = this.drinksForm.get('bebidaName')?.value;
      const tipo = this.drinksForm.get('tipo')?.value;
      const precio = this.drinksForm.get('precio')?.value;
      const stock = this.drinksForm.get('stock')?.value;
      const descripcion = this.drinksForm.get('descripcion')?.value || '';
      const bebida = {
        bebidaName: bebidaName || '',
        tipo: tipo || '',
        precio: precio || '',
        stock: stock || '',
        descripcion: descripcion || '',
      };

      if (this.isEdit()) {
        this.drinksService
          .patchBebidas(bebida, this.data.data.id)
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
    }
  } else {
  this.drinksForm.errors;
  }
}

openSnackBar(msj: string) {
  this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
}
}

