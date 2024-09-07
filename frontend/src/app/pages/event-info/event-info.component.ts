import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../interfaces/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css',
  providers: [DatePipe]
})
export class EventInfoComponent implements OnInit {

  // GetEventByEventId

  event: Event[] = [];
  selectedEvent?: Event;

  constructor(private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe) { }

  // ngOnInit(): void {

  //   const eventId = Number(this.route.snapshot.paramMap.get('id'));
  //   this.selectedEvent = this.event.find(e => e.eventId === eventId);
      
  // }

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (eventId) {
      this.http.get<Event>(`http://localhost:3000/event/${eventId}`).subscribe({
        next: (data) => {
          this.selectedEvent = data;
          // console.log('Event data:', this.selectedEvent);
        },
        error: (err) => {
          console.error('Error fetching event:', err);
        },
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

  onJoinEvent(): void {
    console.log("Join Event Working!")
  }

}
