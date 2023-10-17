import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.scss']
})
export class AddClientsComponent {
  nameControl = new FormControl(null,[Validators.required]);
  surnameControl = new FormControl(null,[Validators.required]);
  numberControl = new FormControl(null,[Validators.required]);

  clientsForm = new FormGroup({
     name: this.nameControl,
     surname: this.surnameControl,
     number: this.numberControl,
  });
}
