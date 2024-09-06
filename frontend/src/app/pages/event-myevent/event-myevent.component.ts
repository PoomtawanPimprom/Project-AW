import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-myevent',
  templateUrl: './event-myevent.component.html',
  styleUrl: './event-myevent.component.css'
})
export class EventMyeventComponent implements OnInit {

  event: any = [
    {"id":"1", "image":"https://www.hfocus.org/sites/default/files/styles/hfocus_super_cover/public/2023-03/xxkkalangkay.png?itok=Humh0up8", "name":"ออกกำลังกาย", "location":"สระสามแสน", "date_time":"05/09/2024 16:00 น."},
    {"id":"4", "image":"https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5BWCKVeaXmVds6InyaIHka3CpOoBGMJFPBuCg1R98iYZ0dy8ixu.jpg", "name":"ตกปลา", "location":"อ่างห้วยยาง", "date_time":"08/09/2024 20:00 น."},
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
      
  }

  onAddEvent(): void {
    this.router.navigate(['/event/create']);
    console.log("Add Event Working!")
  }

  onEditEvent(eventId: number): void {
    this.router.navigate([`/event/edit/${eventId}`]);
    console.log("Edit Event Working! By ID = ", eventId)
  }

  onDeleteEvent(): void {
    console.log("Delete Event Working!")
  }
  
}
