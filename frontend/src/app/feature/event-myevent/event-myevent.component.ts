import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../interfaces/event.model';
import { DatePipe } from '@angular/common';
import { EventService } from '../../service/event/event.service';

@Component({
  selector: 'app-event-myevent',
  templateUrl: './event-myevent.component.html',
  styleUrl: './event-myevent.component.css',
  providers: [DatePipe]
})
export class EventMyeventComponent implements OnInit {
  
  event: Event[] = []
  filteredEvents: Event[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  maxVisiblePages: number = 4;
  showAlert: boolean = false;
  alertMessage: string = '';
  showConfirm: boolean = false;
  confirmMessage: string = '';
  eventIdToDelete: string | null = null;

  constructor(
    private router: Router, 
    private datePipe: DatePipe, 
    private eventService: EventService
  ) { }

  // ngOnInit(): void {
  //   const username = localStorage.getItem('username');
    
  //   if (username) {
  //     this.eventService.getEventsByCreator(username).subscribe({
  //       next: (data) => {
  //         this.event = data;
  //         this.filteredEvents = this.event;
  //         this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  //         this.updatePaginatedEvents();
  //       },
  //       error: (err) => {
  //         console.error('Error fetching events by creator:', err);
  //       }
  //     });
  //   }
  // }

  ngOnInit(): void {
    const objectID = localStorage.getItem('_id');
    
    if (objectID) {
      this.eventService.getEventsByCreator(objectID).subscribe({
        next: (data) => {
          this.event = data;
          this.filteredEvents = this.event;
          this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
          this.updatePaginatedEvents();
        },
        error: (err) => {
          console.error('Error fetching events by creator:', err);
        }
      });
    }
  }

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

  onEventInfo(eventObjId: string): void {
    this.router.navigate([`/event/info/${eventObjId}`]);
  }

  onAddEvent(): void {
    this.router.navigate(['/event/myevent/create']);
  }

  onEditEvent(eventObjId: string): void {
    this.router.navigate([`/event/myevent/edit/${eventObjId}`]);
  }

  onDeleteEvent(eventObjId: string): void {
    this.confirmMessage = 'คุณต้องการลบกิจกรรมนี้ ?'
    this.showConfirm = true;
    this.eventIdToDelete = eventObjId;
  }

  onConfirmDelete(): void {
    if (this.eventIdToDelete !== null) {
      this.eventService.deleteEventById(this.eventIdToDelete).subscribe({
        next: () => {
          this.event = this.event.filter(e => e._id !== this.eventIdToDelete);
          this.filteredEvents = this.event;
          this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
          this.updatePaginatedEvents();

          this.alertMessage = 'ลบกิจกรรมสำเร็จ';
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
          this.showConfirm = false;
        },
        error: (err) => {
          console.error('เกิดข้อผิดพลาดขณะลบกิจกรรม:', err);
        }
      });
    }
  }

  onCloseConfirm() {
      this.showConfirm = false;
      this.eventIdToDelete = null;
  }

}