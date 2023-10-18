import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onButton1Click() {
    if (this.data.button1Action) {
      this.data.button1Action();
    }
  }

  onButton2Click() {
    if (this.data.button2Action) {
      this.data.button2Action();
    }
  }
}
