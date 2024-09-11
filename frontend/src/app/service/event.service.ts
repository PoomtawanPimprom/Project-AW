import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/event';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventsByCreator(username: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/creator/${username}`);
  }

  deleteEventById(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  createEvent(eventData: Event): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }

  updateEvent(eventId: number, eventData: Event): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}`, eventData);
  }
  
}