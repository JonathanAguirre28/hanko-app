import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    console.log('canActivate', this.loginService.isLoggedIn());
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false;
    }
  }
}
