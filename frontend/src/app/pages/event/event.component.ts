import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../interfaces/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {

  // GetListEvent
  event: Event[] = [
    {"id": 1, "image":"https://www.hfocus.org/sites/default/files/styles/hfocus_super_cover/public/2023-03/xxkkalangkay.png?itok=Humh0up8", "name":"ออกกำลังกาย", "location":"สระสามแสน", "date_time":"05/09/2024 16:00 น.", "description":"สวัสดีฮาฟฟู่ว", "creator":"siriphobmean"},
    {"id": 2, "image":"https://www.amarinbabyandkids.com/app/uploads/2021/03/benefits-of-eating-together-with-family-feature-1024x538.jpg", "name":"กินข้าว", "location":"ร้าน ป.1/2", "date_time":"06/09/2024 17:00 น.", "description":"สวัสดีฮาฟฟู่ว", "creator":"siriphobmean"},
    {"id": 3, "image":"https://promotions.co.th/wp-content/uploads/2018/11/major-cineplex.jpg", "name":"ดูหนัง", "location":"The Mall Korat", "date_time":"07/09/2024 19:00 น.", "description":"สวัสดีฮาฟฟู่ว", "creator":"siriphobmean"},
    {"id": 4, "image":"https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5BWCKVeaXmVds6InyaIHka3CpOoBGMJFPBuCg1R98iYZ0dy8ixu.jpg", "name":"ตกปลา", "location":"อ่างห้วยยาง", "date_time":"08/09/2024 20:00 น.", "description":"สวัสดีฮาฟฟู่ว", "creator":"siriphobmean"},
    {"id": 5, "image":"https://example.com/image5.jpg", "name":"กิจกรรมที่ 5", "location":"สถานที่ 5", "date_time":"09/09/2024 16:00 น.", "description":"รายละเอียดที่ 5", "creator":"siriphobmean"},
    {"id": 6, "image":"https://example.com/image6.jpg", "name":"กิจกรรมที่ 6", "location":"สถานที่ 6", "date_time":"10/09/2024 17:00 น.", "description":"รายละเอียดที่ 6", "creator":"siriphobmean"},
    {"id": 7, "image":"https://example.com/image7.jpg", "name":"กิจกรรมที่ 7", "location":"สถานที่ 7", "date_time":"11/09/2024 18:00 น.", "description":"รายละเอียดที่ 7", "creator":"siriphobmean"},
    {"id": 8, "image":"https://example.com/image8.jpg", "name":"กิจกรรมที่ 8", "location":"สถานที่ 8", "date_time":"12/09/2024 19:00 น.", "description":"รายละเอียดที่ 8", "creator":"siriphobmean"},
  ];

  filteredEvents: Event[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredEvents = this.event;
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredEvents = this.event.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.event.length) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  onSearchEvent(): void {
    this.filteredEvents = this.event.filter((f: Event) => {
      const matchesSearch = f.name.includes(this.searchTerm);
      return matchesSearch;
    });
    this.currentPage = 1;
    this.paginate();
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