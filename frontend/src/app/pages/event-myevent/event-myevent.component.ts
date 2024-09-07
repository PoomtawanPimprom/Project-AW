import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Event } from '../../interfaces/event.model';

@Component({
  selector: 'app-event-myevent',
  templateUrl: './event-myevent.component.html',
  styleUrl: './event-myevent.component.css'
})
export class EventMyeventComponent implements OnInit {

  // GetEventByCreator
  event: Event[] = []
  filteredEvents: Event[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  maxVisiblePages: number = 4;

  constructor(private router: Router, private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.filteredEvents = this.event;
  //   this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  //   this.updatePaginatedEvents();
  // }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    
    if (username) {
      this.http.get<Event[]>(`http://localhost:3000/event/creator/${username}`).subscribe({
        next: (data) => {
          this.event = data;
          this.filteredEvents = this.event;
          this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
          this.updatePaginatedEvents();
          // console.log('Events data:', this.event);
        },
        error: (err) => {
          console.error('Error fetching events by creator:', err);
        }
      });
    }
  }

  // onSearchEvent(): void {
  //   this.filteredEvents = this.event.filter((f: Event) => {
  //     const matchesSearch = f.name.includes(this.searchTerm);
  //     return matchesSearch;
  //   });
  // }
  onSearchEvent(): void {
    this.filteredEvents = this.event.filter((f: Event) => {
      return f.name.includes(this.searchTerm);
    });
    
    if (this.filteredEvents.length >= this.itemsPerPage) {
      this.totalPages = 1;
    } else {
      this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    }
    
    this.currentPage = 1;
  }

  updatePaginatedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredEvents = this.event.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedEvents();
    }
  }

  getVisiblePages(): number[] {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onEventInfo(eventId: string): void {
    this.router.navigate([`/event/info/${eventId}`]);
    console.log("Event Info Working! By ID = ", eventId)
  }

  onAddEvent(): void {
    this.router.navigate(['/event/myevent/create']);
    console.log("Add Event Working!")
  }

  onEditEvent(eventId: number): void {
    this.router.navigate([`/event/myevent/edit/${eventId}`]);
    console.log("Edit Event Working! By ID = ", eventId)
  }

  onDeleteEvent(): void {
    console.log("Delete Event Working!")
  }
  
}
