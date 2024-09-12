import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { commentInterface } from '../../../interfaces/comment.model';
import { HttpClient } from '@angular/common/http';
import { CustomValidators } from '../../../customs/customValidators';
import { CommentService } from '../../../service/comment/comment.service';

@Component({
  selector: 'component-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrl: './input-comment.component.css'
})
export class InputCommentComponent implements OnInit {
  private route = inject(ActivatedRoute);

  inputCommentFormGroup!: FormGroup;
  CommentupdateFormGroup!: FormGroup;
  replyCommentFormGroup!: FormGroup;

  selectCommentId!: string
  eventId!: string

  comments: commentInterface[] = [];
  //ยังไม่ get
  objectID_user: string = "66e1d4df9caf79e577871265"

  constructor(private http: HttpClient, private fb: FormBuilder, private CommentService: CommentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get("id")!;
    })
    this.initForms();
    this.CommentService.getCommentByEventId(this.eventId)
    this.fetchCommentData()
  }

  private initForms() {
    this.inputCommentFormGroup = this.fb.group({
      inputComment: ['', [Validators.required, CustomValidators.forbiddenWords(['กู', 'มึง', 'สัส', 'ควย']), CustomValidators.maxLength(100)]]
    });

    this.CommentupdateFormGroup = this.fb.group({
      Commentupdate: ['', [Validators.required, CustomValidators.forbiddenWords(['กู', 'มึง', 'สัส', 'ควย']), CustomValidators.maxLength(100)]]
    });

    this.replyCommentFormGroup = this.fb.group({
      replyComment: ['', [Validators.required, CustomValidators.forbiddenWords(['กู', 'มึง', 'สัส', 'ควย']), CustomValidators.maxLength(100)]]
    });
  }

  isCurrentUser(itemId: string): boolean {
    return this.objectID_user === itemId;
  }

  fetchCommentData() {
    this.CommentService.getCommentByEventId(this.eventId)
      .subscribe(result => {
        this.comments = result;
        console.log(this.comments);
        console.log(this.comments)
      })
  }
  deleteCommentByObID(_id: string) {
    this.CommentService.deleteCommentByObID(_id)
      .subscribe(result => {
        this.fetchCommentData();
      });
  }

  createComment(commentData: any) {
    this.CommentService.createComment(commentData)
      .subscribe(result => {
        this.fetchCommentData();
      })
    this.inputCommentFormGroup.reset();
  }

  createReplycomment(commentReplyData: any) {
    this.CommentService.createReplyComment(commentReplyData)
      .subscribe(result => {
        this.fetchCommentData();
      })
    this.replyCommentFormGroup.reset();
  }

  updateComment() {
    const comment = this.CommentupdateFormGroup.get("Commentupdate")?.value
    this.CommentService.updateComment(this.selectCommentId, comment)
      .subscribe(result => {
        this.fetchCommentData();
      })

    this.CommentupdateFormGroup.reset();
  }

  //Onclick 
  onClickCreateCommet() {
    const comment = this.inputCommentFormGroup.get("inputComment")?.value
    const dataComment = {
      comment: comment,
      eventId: Number(this.eventId),
      object_userId: this.objectID_user
    }
    this.createComment(dataComment)
  };

  onClickCreateReplyComment(objParentComment: string) {
    const comment = this.replyCommentFormGroup.get("replyComment")?.value
    const dataReply = {
      objParentComment: objParentComment,
      comment: comment,
      eventId: this.eventId,
      object_userId: this.objectID_user
    }
    this.createReplycomment(dataReply)
  }

  async onClickDeleteComment(_id: string) {
    this.deleteCommentByObID(_id);
  }

  async onClickUpdateComment(_id: string) {
    this.updateComment();
  }

  async onClikeSelectComment(_id: string) {
    this.selectCommentId = _id;
  }
}
