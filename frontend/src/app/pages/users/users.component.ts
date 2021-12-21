import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.findAll(this.currentPage, this.itemsPerPage).pipe(
      tap(users => console.log(users)),
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }

  nextPage() {
    if(this.currentPage == this.dataSource?.meta.totalPages) return;
    this.currentPage++;
    this.getUsers();
  }

  previousPage() {
    if(this.currentPage == 1) return;
    this.currentPage--;
    this.getUsers();
  }

  updateItemsPerPage(){
    this.getUsers();
  }

  navigateToProfile(id?: string) {
    this.router.navigate(['./' + id], {relativeTo: this.activatedRoute});
  }

}
