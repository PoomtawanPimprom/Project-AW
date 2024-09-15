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
  private apiURL3 = 'http://localhost:3000/event';

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
  getAllFriendsAcceptedByUserId(userId: string): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.apiURL}/accepted/${userId}`, { headers: this.getAuthHeaders() });
  }

  // ดึงข้อมูลเพื่อนที่มีสถานะ accepted
  getAllFriendsAcceptedByUserId2(userId: string): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.apiURL}/accepted2/${userId}`, { headers: this.getAuthHeaders() });
  }


  // ดึงข้อมูลเพื่อนที่มีสถานะ pending
  getAllFriendPendingByUserId1(userId1: string): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.apiURL}/pending/${userId1}`, { headers: this.getAuthHeaders() });
  }

  getAllUser(): Observable<userInterface[]> {
    return this.http.get<userInterface[]>(this.apiURL2, { headers: this.getAuthHeaders() });
  }

  getImforUserId1(userId1: string): Observable<Friend[]>{
    return this.http.get<Friend[]>(`${this.apiURL}/imfor/${userId1}`, { headers: this.getAuthHeaders() })
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiURL3}/${eventId}`, { headers: this.getAuthHeaders() });
  }
  
  updateFriendStatusAccepted(userId1: string, userId2: string): Observable<any> {
    const requestBody = { userId1, userId2 };
    return this.http.put(`${this.apiURL}/updateFriendAccepted`, requestBody, { headers: this.getAuthHeaders() });
  }

  addFriends(userId1: string, userId2: string): Observable<any> {
    const requestBody = { userId1, userId2 };
    console.log('Request Body:', requestBody); // ตรวจสอบข้อมูลที่ส่งไป
    return this.http.post(`${this.apiURL2}/addFriend`, requestBody, { headers: this.getAuthHeaders() });
  }
}
