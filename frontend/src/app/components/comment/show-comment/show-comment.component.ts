import { Component, Input, OnInit } from '@angular/core';
import { commentInterface } from '../../../interfaces/comment.model';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../../service/profile/profile.service';
import { userInterface } from '../../../interfaces/user.model';
@Component({
  selector: 'component-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrl: './show-comment.component.css'
})
export class ShowCommentComponent implements OnInit {
  @Input() comment: string = '';
  objectId_user!: string
  
  oneComments: commentInterface[] = [];
  user!:userInterface

  constructor(private http: HttpClient, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.objectId_user = String(localStorage.getItem("_id"))
    this.fetchCommentData();
  }

  fetchCommentData() {
    this.profileService.getUserByObjectId(this.objectId_user)
      .subscribe(result => {
        this.user = result
      });
  }
}
