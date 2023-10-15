import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('felipeofor@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('1234admin', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const user = {
        email: email || '',
        password: password || '',
      };

      this.loginService.postLogin(user).subscribe({
        next: () => {
          this.loginService.setLoggedIn(true);
          this.router.navigate(['dashboard']);
        },
        error: (e) => {
          this.openSnackBar(e.error.message);
        },
      });
    }
  }

  openSnackBar(msj: string) {
    this._snackBar.open(msj, 'Cerrar', { duration: 2500 });
  }
}
