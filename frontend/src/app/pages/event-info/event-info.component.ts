import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../interfaces/event.model';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent implements OnInit {

  // Get EventDataByID
  event: Event[] = [
    {"id": 1, "image":"https://www.hfocus.org/sites/default/files/styles/hfocus_super_cover/public/2023-03/xxkkalangkay.png?itok=Humh0up8", "name":"ออกกำลังกาย", "location":"สระสามแสน", "date_time":"05/09/2024 16:00 น.", "description":"มาออกกำลังกายเพื่อสุขภาพไปด้วยกันนะครับ มาออกกำลังกายเพื่อสุขภาพไปด้วยกันนะครับ มาออกกำลังกายเพื่อสุขภาพไปด้วยกันนะครับ มาออกกำลังกายเพื่อสุขภาพไปด้วยกันนะครับ", "creator":"siriphobmean"},
    {"id": 2, "image":"https://www.amarinbabyandkids.com/app/uploads/2021/03/benefits-of-eating-together-with-family-feature-1024x538.jpg", "name":"กินข้าว", "location":"ร้าน ป.1/2", "date_time":"06/09/2024 17:00 น.", "description":"มากินข้าวแสนอร่อยไปด้วยกันนะครับ มากินข้าวแสนอร่อยไปด้วยกันนะครับ มากินข้าวแสนอร่อยไปด้วยกันนะครับ มากินข้าวแสนอร่อยไปด้วยกันนะครับ มากินข้าวแสนอร่อยไปด้วยกันนะครับ", "creator":"siriphobmean"},
    {"id": 3, "image":"https://promotions.co.th/wp-content/uploads/2018/11/major-cineplex.jpg", "name":"ดูหนัง", "location":"The Mall Korat", "date_time":"07/09/2024 19:00 น.", "description":"มาดูหนังด้วยกันนะครับ มาดูหนังด้วยกันนะครับ มาดูหนังด้วยกันนะครับ มาดูหนังด้วยกันนะครับ มาดูหนังด้วยกันนะครับ มาดูหนังด้วยกันนะครับ มาดูหนังด้วยกันนะครับ มาดูหนังด้วยกันนะครับ มาดูหนังด้วยกันนะครับ", "creator":"siriphobmean"},
    {"id": 4, "image":"https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5BWCKVeaXmVds6InyaIHka3CpOoBGMJFPBuCg1R98iYZ0dy8ixu.jpg", "name":"ตกปลา", "location":"อ่างห้วยยาง", "date_time":"08/09/2024 20:00 น.", "description":"ไปตกปลาด้วยกันไหมครับ ไปตกปลาด้วยกันไหมครับ ไปตกปลาด้วยกันไหมครับ ไปตกปลาด้วยกันไหมครับ ไปตกปลาด้วยกันไหมครับ ไปตกปลาด้วยกันไหมครับ ไปตกปลาด้วยกันไหมครับ", "creator":"siriphobmean"},
  ]

  selectedEvent?: Event;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedEvent = this.event.find(e => e.id === eventId);
      
  }

  onJoinEvent(): void {
    console.log("Join Event Working!")
  }

}
