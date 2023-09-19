import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavMenuComponent } from './loyout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './loyout/toolbar/toolbar.component';
import { RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
  ]
})
export class DashboardModule { }
