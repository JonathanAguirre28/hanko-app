import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ], 
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
  ]
})
export class SharedModule { }
