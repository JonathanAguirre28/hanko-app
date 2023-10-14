import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
  });

  constructor(private router: Router, private loginService: LoginService) {}

  onSubmit() {
    this.router.navigate(['dashboard']);
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const user = {
        email: email || '',
        password: password || '',
      };

      this.loginService.postLogin(user).subscribe(
        (response) => {
          console.log(response, 'inicio de sesion exitoso');
          this.router.navigate(['register']);
        },
        (error) => {
          console.log(error, 'error al iniciar sesion');
        }
      );
    } else {
      console.log('formulario invalido');
    }
  }
}