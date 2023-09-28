import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavMenuComponent } from './loyout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './loyout/toolbar/toolbar.component';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
