import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddUsersComponent {
  usersForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
  });

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialog.closeAll();
  }

  onSubmit() {
    if (this.usersForm.valid) {
      const email = this.usersForm.get('email')?.value;
      const password = this.usersForm.get('password')?.value;
      const userName = this.usersForm.get('userName')?.value;
      const ejercicio = {
        email: email,
        password: password,
        userName: userName,
      };
    }
  }
  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}
