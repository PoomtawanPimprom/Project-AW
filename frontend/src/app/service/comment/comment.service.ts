import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commentInterface } from '../../interfaces/comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiURL = 'http://localhost:3000/comment'
  constructor(private http: HttpClient) { }

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    })
  }

  getCommentByEventObjectId(event_ObjectId: string): Observable<commentInterface[]> {
    return this.http.get<commentInterface[]>(`${this.apiURL}/${event_ObjectId}`, { headers: this.getAuthHeader() })
  }

  createComment(commentData: any) {
    return this.http.post(`${this.apiURL}`, commentData, { headers: this.getAuthHeader() })
  }

  createReplyComment(commentReplyData: any) {
    return this.http.post(`${this.apiURL}/reply`, commentReplyData, { headers: this.getAuthHeader() })
  }

  updateComment(coment_id: string, commentData: any) {
    return this.http.put(`http://localhost:3000/comment/edit/${coment_id}`, { comment: commentData }, { headers: this.getAuthHeader() })
  }

  deleteCommentByObID(_id: string) {
    return this.http.delete(`${this.apiURL}/${_id}`, { headers: this.getAuthHeader() })
  }


}
