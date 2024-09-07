import { Component, OnInit } from '@angular/core';
import { Event } from '../../interfaces/event.model';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent implements OnInit {

  // Get EventDataByID
  event: Event[] = [
    {"id": 1, "image":"https://www.hfocus.org/sites/default/files/styles/hfocus_super_cover/public/2023-03/xxkkalangkay.png?itok=Humh0up8", "name":"ออกกำลังกาย", "location":"สระสามแสน", "date_time":"05/09/2024 16:00 น."},
  ]

  constructor() { }

  ngOnInit(): void {
      
  }
}
