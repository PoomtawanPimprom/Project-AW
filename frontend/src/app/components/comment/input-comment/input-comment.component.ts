import { Component, ViewChild } from '@angular/core';
import { ShowCommentComponent } from '../show-comment/show-comment.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'component-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrl: './input-comment.component.css'
})
export class InputCommentComponent {
  commentControl = new FormControl('');

  @ViewChild(ShowCommentComponent) 
  showCommentComponent!: ShowCommentComponent;

  updateComment() {
    if (this.showCommentComponent) {
      this.showCommentComponent.updateComment(this.commentControl.value || '');
    }
  }
}
