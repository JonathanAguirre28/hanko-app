import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './pages/users/users.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RoutinesComponent } from './pages/routines/routines/routines.component';
import { AddExerciseComponent } from './pages/exercises/modal/add-exercise/add-exercise.component';
import { AddDrinksComponent } from './pages/drinks/modal/add-drinks/add-drinks.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ClientsComponent,
    FinanceComponent,
    ExercisesComponent,
    RoutinesComponent,
    AddExerciseComponent,
    DrinksComponent,
    AddDrinksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    DashboardRoutingModule,
  ],
  exports: [
    DashboardComponent,
    ClientsComponent,
    ExercisesComponent,
    UsersComponent,
  ],
})
export class DashboardModule {}
