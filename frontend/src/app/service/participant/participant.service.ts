import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../../interfaces/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiUrl = 'http://localhost:3000/participant';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getParticipantCount(eventId: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count/${eventId}`, { headers: this.getAuthHeaders() });
  }

  getParticipantStatus(member: string, eventId: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}?member=${member}&eventId=${eventId}`, { headers: this.getAuthHeaders() });
  }

  joinEvent(participantData: Participant): Observable<any> {
    return this.http.post(this.apiUrl, participantData, { headers: this.getAuthHeaders() });
  }

  leaveEvent(member: string, eventId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?member=${member}&eventId=${eventId}`, { headers: this.getAuthHeaders() });
  }
}