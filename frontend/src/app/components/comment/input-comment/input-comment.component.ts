import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { commentInterface } from '../../../interfaces/comment.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'component-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrl: './input-comment.component.css'
})
export class InputCommentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  inputComment = new FormControl('');
  eventId!: string
  comments: commentInterface[] = [];

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get("id")!;
    })
    this.fetchCommentData();
}

  async fetchCommentData() {
    this.http.get<commentInterface[]>(`http://localhost:3000/comment/${this.eventId}`)
      .subscribe(result => { 
        this.comments = result;
        console.log(result)
      })
  }

  async createComment(commmentData: any) {
    this.http.post(`http://localhost:3000/comment`, commmentData)
      .subscribe(result => {console.log(result)})
  }

  onClickCreateCommet() {
    const dataComment = {
      commentId: 4,
      comment: this.inputComment.value || '',
      eventId: Number(this.eventId),
      object_userId: "66df21485b9a7e6d3912798e"
    }
    this.createComment(dataComment)
    this.fetchCommentData();
  };

}
