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

  // Fetch events all
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  // Fetch events by creator
  getEventsByCreator(username: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/creator/${username}`);
  }

  // Delete event by ID
  deleteEventById(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }

  // Fetch event by ID
  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }
  
}