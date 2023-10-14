import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuarios',
        component: UsersComponent,
      },
      {
        path: 'clientes',
        component: ClientsComponent,
      },
      {
        path: 'ejercicios',
        component: ExercisesComponent,
      },
      {
        path: 'bebidas',
        component: DrinksComponent,
      },
      {
        path: 'finanzas',
        component: FinanceComponent,
      },
      {
        path: '**',
        component: UsersComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
