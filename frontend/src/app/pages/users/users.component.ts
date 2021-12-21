import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { UserData, UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource?: UserData;
  displayedColumns: string[] = ['Id', 'Name', 'Username', 'Email', 'Role'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initDataSource()
  }

  initDataSource() {
    this.userService.findAll(1, 10).pipe(
      tap(users => console.log(users)),
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }

}
