import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commentInterface } from '../../interfaces/comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiURL = 'http://localhost:3000/comment'
  constructor(private http: HttpClient) { }

  getCommentByEventId(eventId: string): Observable<commentInterface[]> {
    return this.http.get<commentInterface[]>(`${this.apiURL}/${eventId}`)
  }

  deleteCommentByObID(_id: string) {
    return this.http.delete(`${_id}`)
  }

  createComment(commentData: any) {
    return this.http.post(`${this.apiURL}`, commentData)
  }

  createReplyComment(commentReplyData: any){
    return this.http.post(`${this.apiURL}/reply`, commentReplyData)
  }

  updateComment(coment_id: string, commentData: any) {
    return this.http.put(`http://localhost:3000/comment/edit/${coment_id}`, { comment: commentData })

  }

}
