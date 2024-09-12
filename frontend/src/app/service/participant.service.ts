import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../interfaces/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiUrl = 'http://localhost:3000/participant';

  constructor(private http: HttpClient) { }

  getParticipantCount(eventId: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count/${eventId}`);
  }

  getParticipantStatus(member: string, eventId: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}?member=${member}&eventId=${eventId}`);
  }

  joinEvent(participantData: Participant): Observable<any> {
    return this.http.post(this.apiUrl, participantData);
  }

  leaveEvent(member: string, eventId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?member=${member}&eventId=${eventId}`);
  }
  
}