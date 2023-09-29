import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { FinanceComponent } from './pages/finance/finance.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: '/clients',
        component: ClientsComponent,
      },
      {
        path: 'drinks',
        component: DrinksComponent,
      },
      {
        path: 'finance',
        component: FinanceComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
