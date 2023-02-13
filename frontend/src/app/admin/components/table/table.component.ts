import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableData } from '../../models/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() dataSource?: TableData;
  @Input() columns?: string[];
  @Input() displayedColumns!: string[];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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
