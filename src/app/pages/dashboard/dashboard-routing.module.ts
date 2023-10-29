import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { RoutinesComponent } from './pages/routines/routines/routines.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
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
        path: 'rutinas',
        component: RoutinesComponent,
      },
      {
        path: '**',
        component: HomeComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
