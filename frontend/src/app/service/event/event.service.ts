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
  } // Success

  getEventsByCreator(creatorId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/creator/${creatorId}`, { headers: this.getAuthHeaders() });
  } // Success

  deleteEventById(eventObjId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventObjId}`, { headers: this.getAuthHeaders() });
  } // Success

  getEventById(eventObjId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventObjId}`, { headers: this.getAuthHeaders() });
  } // Success

  createEvent(eventData: Event): Observable<any> {
    return this.http.post(this.apiUrl, eventData, { headers: this.getAuthHeaders() });
  } // Success

  updateEvent(eventObjId: string, eventData: Event): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventObjId}`, eventData, { headers: this.getAuthHeaders() });
  } // Success

  getCreatorNameByObjectId(objectId: string): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(`${this.apiUrl}/username/${objectId}`, { headers: this.getAuthHeaders() });
  } // Success

}