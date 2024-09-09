import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { commentInterface } from '../../../interfaces/comment.model';

@Component({
  selector: 'component-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrl: './input-comment.component.css'
})
export class InputCommentComponent implements OnInit {
  inputComment = new FormControl('');
  private route = inject(ActivatedRoute);
  eventId!: string

  constructor() { }

  commment:commentInterface[] = [{
    "commentId": 1,
    "comment": "test1",
    "eventId": 1,
    "userId": 1,
  }]


  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get("id")!;
    })
  }
}
