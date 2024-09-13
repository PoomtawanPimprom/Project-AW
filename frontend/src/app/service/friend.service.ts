import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friend } from '../interfaces/friend.medel';

@Injectable({
  providedIn: 'root'
})

export class FriendService implements OnInit {
  
  private apiURL = 'http://localhost:3000/friend';
  friends: Friend[] = [];
  allFriends: Friend[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  // ดึงข้อมูลเพื่อนที่มีสถานะ accepted
  getAllFriendsAcceptedByUserId1(userId1: string): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.apiURL}/accepted/${userId1}`);
  }

  // ดึงข้อมูลเพื่อนที่มีสถานะ pending
  getAllFriendPendingByUserId1(userId1: string): Observable<Friend[]> {
    return this.http.get<Friend[]>(`${this.apiURL}/pending/${userId1}`);
  }

  getAllFriendsByUserId(userId1: string): Observable<Friend[]>{
    return this.http.get<Friend[]>(`${this.apiURL}/all/${userId1}`);
  }


}
