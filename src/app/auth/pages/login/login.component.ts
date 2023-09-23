import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      // El formulario es válido, aquí puedes realizar la lógica de inicio de sesión
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Realiza la lógica de inicio de sesión, por ejemplo, enviando los datos al servidor
      // Puedes utilizar un servicio para manejar la autenticación
      // Por ejemplo, si estás utilizando HttpClient:
      // this.authService.login(email, password).subscribe(
      //   (response) => {
      //     // Manejar la respuesta exitosa
      //   },
      //   (error) => {
      //     // Manejar errores, por ejemplo, mostrar un mensaje de error
      //   }
      // );
    } else {
      this.loginForm.get('email')?.setErrors;
    }
  }

  redirectRegister() {
    this.router.navigate(['register']);
  }
}
