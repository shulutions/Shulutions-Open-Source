import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationData } from 'src/app/models/pagination.interface';
import { TableData } from '../../models/table.interface';

declare var Object: any;


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
 
  @Input() dataSource?: PaginationData;
  @Input() headers!: string[];
  @Input() itemsPerPage?: number = 10;
  currentPage: number = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // Console log the data source when it changes
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.dataSource && changes.dataSource.currentValue) {
  //     console.log(changes.dataSource.currentValue);
  //   }
  // }

  getTableHeaders(data: any) {
    return Object.keys(data[0]);
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  nextPage() {
    if(this.currentPage == this.dataSource?.meta.totalPages) return;
    this.currentPage++;
  }

  previousPage() {
    if(this.currentPage == 1) return;
    this.currentPage--;
  }

  updateItemsPerPage(){
    //this.getUsers();
  }

  navigateToItem(id?: string) {
    this.router.navigate(['/users/' + id], {relativeTo: this.activatedRoute});
  }

}
