import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../interfaces/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/event';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getEventsByCreator(username: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/creator/${username}`, { headers: this.getAuthHeaders() });
  }

  deleteEventById(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`, { headers: this.getAuthHeaders() });
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`, { headers: this.getAuthHeaders() });
  }

  createEvent(eventData: Event): Observable<any> {
    return this.http.post(this.apiUrl, eventData, { headers: this.getAuthHeaders() });
  }

  updateEvent(eventId: number, eventData: Event): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}`, eventData, { headers: this.getAuthHeaders() });
  }
}