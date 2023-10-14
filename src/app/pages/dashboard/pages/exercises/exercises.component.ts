import { Component, OnInit } from '@angular/core';
import { ExercisesService } from './services/exercises.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'titulo', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); // Use MatTableDataSource for your data
  constructor(private exercisesServices: ExercisesService) {}

  ngOnInit(): void {
    this.exercisesServices.getRutinas().subscribe({
      next: (res) => {
        console.log('res', res);
      },
    });
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, titulo: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, titulo: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, titulo: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, titulo: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, titulo: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, titulo: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, titulo: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, titulo: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, titulo: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, titulo: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface PeriodicElement {
  titulo: string;
  position: number;
  weight: number;
  symbol: string;
}
