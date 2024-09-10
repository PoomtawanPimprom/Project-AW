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
  commentUpdate = new FormControl('');
  eventId!: string
  comments: commentInterface[] = [];

  selectCommentId!:string


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get("id")!;
    })
    this.fetchCommentData();
    
  }

  fetchCommentData() {
    this.http.get<commentInterface[]>(`http://localhost:3000/comment/${this.eventId}`)
      .subscribe(result => {
        this.comments = result;
        console.log(result)
      })
  }
  deleteCommentByObID(_id: string) {
    this.http.delete(`http://localhost:3000/comment/${_id}`)
      .subscribe(result => {
        console.log(result)
        this.fetchCommentData();
      })
  }

  createComment(commmentData: any) {
    this.http.post(`http://localhost:3000/comment`, commmentData)
      .subscribe(result => {
        console.log(result)
        this.fetchCommentData();
      })
      this.inputComment.reset();
  }

  updateComment() {
    const comment = { comment:this.commentUpdate.value }
    this.http.put(`http://localhost:3000/comment/edit/${this.selectCommentId}`,comment )
      .subscribe(result => {
        console.log(result)
        this.fetchCommentData();
      })
      this.commentUpdate.reset();
  }


  //Onclick 
  onClickCreateCommet() {
    const dataComment = {
      comment: this.inputComment.value || '',
      eventId: Number(this.eventId),
      object_userId: "66df21485b9a7e6d3912798e"
    }
    this.createComment(dataComment)
    this.fetchCommentData();
  };

  async onClickDeleteComment(_id: string) {
    this.deleteCommentByObID(_id);
  }

  async onClickUpdateComment(_id:string) {
    console.log("_idComment",_id)
    this.updateComment();
  }

  async onClikeSelectComment(_id:string) {
    this.selectCommentId = _id;
    console.log(this.selectCommentId)
  }
}
