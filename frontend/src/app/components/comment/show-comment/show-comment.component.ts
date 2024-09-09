import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrl: './show-comment.component.css'
})
export class ShowCommentComponent {
  @Input() comment: string = '';

}
