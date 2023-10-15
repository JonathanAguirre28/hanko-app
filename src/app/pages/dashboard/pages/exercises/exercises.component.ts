import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExercisesService } from './services/exercises.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddExerciseComponent } from './modal/add-exercise/add-exercise.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExercisesComponent implements OnInit {
  displayedColumns: string[] = [
    'rutina',
    'nombre',
    'tipo',
    'series',
    'repeticiones',
    'descripcion',
  ];
  dataSource: any = new MatTableDataSource<any>();
  constructor(
    private exercisesServices: ExercisesService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.exercisesServices.getRutinas().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
    });
  }
  createExercise() {
    const dialogRef = this.dialog.open(AddExerciseComponent);
  }
}
