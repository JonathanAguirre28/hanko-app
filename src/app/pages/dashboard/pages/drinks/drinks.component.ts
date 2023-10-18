import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DrinksService } from './services/drinks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddDrinksComponent } from './modal/add-drinks/add-drinks.component';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DrinksComponent implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'tipo',
    'precio',
    'stock',
    'descripcion',
    'deleteEdit',
  ];
  dataSource: any = new MatTableDataSource<any>();
  constructor(private drinksService: DrinksService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.drinksService.getBebidas().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
    });
  }
  createDrinks() {
    this.dialog.open(AddDrinksComponent, {
      data: {
        closeModal: () => this.dialog.closeAll(),
      },
    });
  }
}
