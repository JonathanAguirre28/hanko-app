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
    'series',
    'repeticiones',
    'descripcion',
    'deleteEdit',
  ];
  dataSource: any = new MatTableDataSource<any>();
  constructor(
    private exercisesServices: ExercisesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.exercisesServices.getExcercises().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
    });
  }

  createExercise() {
    const dialog = this.dialog.open(AddExerciseComponent, {
      data: {
        closeModal: () => this.dialog.closeAll(),
      },
    });

    dialog.afterClosed().subscribe((result) => {
      this.getExercises();
    });
  }

  editExercise(data: any) {
    const dialog = this.dialog.open(AddExerciseComponent, {
      data: {
        data: data,
        closeModal: () => this.dialog.closeAll(),
      },
    });

    dialog.afterClosed().subscribe((result) => {
      this.getExercises();
    });
  }

  deleteExercise(data: any) {
    console.log('delete exercise', data);
  }
}
