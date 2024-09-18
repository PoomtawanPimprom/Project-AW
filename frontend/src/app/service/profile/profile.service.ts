import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userInterface } from '../../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserByObjectId(object_id: string):Observable<userInterface> {
    return this.http.get<userInterface>(`${this.apiUrl}/userData/${object_id}`, { headers: this.getAuthHeaders() })
  }
  
}