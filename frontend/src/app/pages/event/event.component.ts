import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Event } from '../../interfaces/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  providers: [DatePipe]
})
export class EventComponent implements OnInit {

  // GetEvent
  event: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  maxVisiblePages: number = 4;

  constructor(private router: Router, private http: HttpClient, private datePipe: DatePipe) { }

  // ngOnInit(): void {
  //   this.filteredEvents = this.event;
  //   this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  //   this.updatePaginatedEvents();
  // }

  ngOnInit(): void {
    this.http.get<Event[]>('http://localhost:3000/event')
      .subscribe({
        next: (data) => {
          // console.log('Data fetched from API:', data);
          this.event = data;
          this.filteredEvents = this.event;
          this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
          this.updatePaginatedEvents();
        },
        error: (error) => {
          console.error('Error fetching events:', error);
        },
        // complete: () => {
        //   console.log('Data fetching complete');
        // }
      });
  }

  // formatDate(date: string): string {
  //   const dateObj = new Date(date);
  //   return this.datePipe.transform(dateObj, 'dd-MM-yyyy เวลา HH:mm น.') || '';
  // }
  formatDate(date: string): string {
    const dateObj = new Date(date);
    const yearBuddhist = dateObj.getFullYear() + 543;
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const monthName = months[dateObj.getMonth()];
    return `${dateObj.getDate()} ${monthName} ${yearBuddhist} เวลา ${this.datePipe.transform(dateObj, 'HH:mm')} น.`;
  }

  // onSearchEvent(): void {
  //   this.filteredEvents = this.event.filter((f: Event) => {
  //     return f.name.includes(this.searchTerm);
  //   });
  //   this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  //   this.currentPage = 1;
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

  onMyEvent(): void {
    this.router.navigate(['/event/myevent']);
    console.log("My Event Working!")
  }

  onAddEvent(): void {
    this.router.navigate(['/event/myevent/create']);
    console.log("Add Event Working!")
  }

}