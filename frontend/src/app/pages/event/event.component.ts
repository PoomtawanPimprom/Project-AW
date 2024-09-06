import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Event {
  id: number;
  image: string;
  name: string;
  location: string;
  date_time: string;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {

  event: Event[] = [
    {"id": 1, "image":"https://www.hfocus.org/sites/default/files/styles/hfocus_super_cover/public/2023-03/xxkkalangkay.png?itok=Humh0up8", "name":"ออกกำลังกาย", "location":"สระสามแสน", "date_time":"05/09/2024 16:00 น."},
    {"id": 2, "image":"https://www.amarinbabyandkids.com/app/uploads/2021/03/benefits-of-eating-together-with-family-feature-1024x538.jpg", "name":"กินข้าว", "location":"ร้าน ป.1/2", "date_time":"06/09/2024 17:00 น."},
    {"id": 3, "image":"https://promotions.co.th/wp-content/uploads/2018/11/major-cineplex.jpg", "name":"ดูหนัง", "location":"The Mall Korat", "date_time":"07/09/2024 19:00 น."},
    {"id": 4, "image":"https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5BWCKVeaXmVds6InyaIHka3CpOoBGMJFPBuCg1R98iYZ0dy8ixu.jpg", "name":"ตกปลา", "location":"อ่างห้วยยาง", "date_time":"08/09/2024 20:00 น."},
  ]

  filteredEvents: Event[] = [];
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredEvents = this.event;
  }

  onSearchEvent(): void {
    this.filteredEvents = this.event.filter((f: Event) => {
      const matchesSearch = f.name.includes(this.searchTerm);
      return matchesSearch;
    });
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