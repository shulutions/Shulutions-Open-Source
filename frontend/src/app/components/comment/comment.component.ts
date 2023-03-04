import { Component, Input, OnInit } from '@angular/core';
import { ProjectRequestComment } from 'src/app/models/project-request.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment?: ProjectRequestComment

  constructor() { }

  ngOnInit(): void {
  }

}
