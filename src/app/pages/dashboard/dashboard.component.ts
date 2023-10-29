import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  constructor(private loginService: LoginService, private router: Router) { }

  logout(): void {
    this.loginService.setLogout();
    this.router.navigate(['login']);
  }
}
