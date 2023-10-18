import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from './service/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUsersComponent } from './model/add-users/add-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'userName',
    'email',
  ];
  dataSource: any = new MatTableDataSource<any>();
  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
    })
  }
  postUsers() {
    this.dialog.open(AddUsersComponent, {
      data: {
        closeModal: () => this.dialog.closeAll(),
      },
    });
  }
}
