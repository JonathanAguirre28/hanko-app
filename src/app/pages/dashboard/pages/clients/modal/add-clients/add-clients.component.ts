import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AddClientsComponent implements OnInit {
  clientForm = new FormGroup({
    Active: new FormControl('', [Validators.required]),
    FullName: new FormControl('', [Validators.required]),
    Age: new FormControl('', [
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
    DateOfBirth: new FormControl('', [Validators.required]),
    DateOfInscription: new FormControl('', [Validators.required]),
    Phone: new FormControl('', [Validators.required]),
    EmergencyNumber: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
  });

  constructor(
    private clientsService: ClientsService,
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
      this.clientForm
      this.clientForm.get('FullName')?.setValue(this.data.data.fullName);
      this.clientForm
        .get('Age')
        ?.setValue(this.data.data.age);
      this.clientForm
        .get('DateOfBirth')
        ?.setValue(this.data.data.dateOfBirth);
      this.clientForm
        .get('DateOfInscription')
        ?.setValue(this.data.data.ateOfInscription);
      this.clientForm
        .get('Phone')
        ?.setValue(this.data.data.phone);
      this.clientForm
        .get('EmergencyNumber')
        ?.setValue(this.data.data.emergencyNumber);
      this.clientForm
        .get('Email')
        ?.setValue(this.data.data.email);
      this.clientForm
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const Active = this.clientForm.get('Active')?.value;
      const FullName = this.clientForm.get('FullName')?.value;
      const Age = 2;
      const DateOfBirth = this.clientForm.get('DateOfBirth')?.value;
      const DateOfInscription = this.clientForm.get('DateOfInscription')?.value;
      const Phone = this.clientForm.get('Phone')?.value;
      const EmergencyNumber = this.clientForm.get('EmergencyNumber')?.value;
      const Email = this.clientForm.get('Email')?.value;
      const cliente = {
        active: Active || '',
        fullName: FullName || '',
        age: Age || '',
        dateOfBirth: DateOfBirth || '',
        dateOfInscription: DateOfInscription || '',
        phone: Phone || '',
        emergencyNumber: EmergencyNumber || '',
        email: Email || '',
      };

      if (this.isEdit()) {
        this.clientsService
          .patchClients(cliente, this.data.data.id)
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
        this.clientsService.postClients(cliente).subscribe({
          next: (res: any) => {
            this.openSnackBar(res.message);
            this.dialog.closeAll();
            this.clientsService.refreshTable();
          },
          error: (e) => {
            this.openSnackBar(e.error.message);
          },
        });
      }
    } else {
      this.clientForm.errors;
    }
  }

  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}
