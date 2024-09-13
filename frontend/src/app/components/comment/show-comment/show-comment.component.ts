import { Component, Input, OnInit } from '@angular/core';
import { commentInterface } from '../../../interfaces/comment.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'component-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrl: './show-comment.component.css'
})
export class ShowCommentComponent implements OnInit {
  @Input() comment: string = '';
  @Input() eventId: string = '';
  oneComments: commentInterface[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCommentData();
  }

  fetchCommentData() {
    
  }
}
