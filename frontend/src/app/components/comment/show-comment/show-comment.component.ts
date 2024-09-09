import { Component } from '@angular/core';

@Component({
  selector: 'component-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrl: './show-comment.component.css'
})
export class ShowCommentComponent {
  comment: string = '';

  updateComment(newComment: string) {
    this.comment = newComment;
  }
}
