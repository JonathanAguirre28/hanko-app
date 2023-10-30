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
import { AddClientsComponent } from './pages/clients/modal/add-clients/add-clients.component';
import { AddDrinksComponent } from './pages/drinks/modal/add-drinks/add-drinks.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddUsersComponent } from './pages/users/model/add-users/add-users.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from 'src/app/shared/component/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatCard } from '@angular/material/card';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ClientsComponent,
    FinanceComponent,
    ExercisesComponent,
    RoutinesComponent,
    AddExerciseComponent,
    AddClientsComponent,
    DrinksComponent,
    AddDrinksComponent,
    AddUsersComponent,
    HomeComponent,
    CardComponent,
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
    MatPaginatorModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgChartsModule,
    MatCardModule
  ],
  exports: [
    DashboardComponent,
    ClientsComponent,
    ExercisesComponent,
    UsersComponent,
    MatCard
  ],
})
export class DashboardModule { }
