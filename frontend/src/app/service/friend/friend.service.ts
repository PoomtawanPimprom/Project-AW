import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friend } from '../../interfaces/friend.medel';
import { userInterface } from '../../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})

export class FriendService implements OnInit {
  private apiURL = 'http://localhost:3000/friend'
  private apiURL2 = 'http://localhost:3000/user'
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  friends: Friend[] = [];
  allFriends: Friend[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  // ดึงข้อมูลเพื่อนที่มีสถานะ accepted
  getAllFriendsAcceptedByUserId1(userId1: string): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.apiURL}/accepted/${userId1}`, { headers: this.getAuthHeaders() });
  }

  // ดึงข้อมูลเพื่อนที่มีสถานะ pending
  getAllFriendPendingByUserId1(userId1: string): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.apiURL}/pending/${userId1}`, { headers: this.getAuthHeaders() });
  }

  getAllFriendsByUserId(userId1: string): Observable<Friend[]>{
    return this.http.get<Friend[]>(`${this.apiURL}/all/${userId1}`, { headers: this.getAuthHeaders() });
  }

  getAllUser(): Observable<userInterface[]> {
    return this.http.get<userInterface[]>(this.apiURL2, { headers: this.getAuthHeaders() });
  }
  
  updateFriendStatus(userId1: string, userId2: string): Observable<any> {
    const requestBody = { userId1, userId2 };
    return this.http.put(`${this.apiURL}/updateStatus, requestBody`, { headers: this.getAuthHeaders() });
  }
}
