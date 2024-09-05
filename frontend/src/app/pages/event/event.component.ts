import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {

  event: any = [
    {"id":"1", "image":"https://t3.ftcdn.net/jpg/00/72/98/56/360_F_72985661_LU1Xk0YQiPBwOuesuuJgwTn0NPlwP8ob.jpg", "name":"นัดเย็ด", "location":"อ่างห้วยยาง", "date_time":"05/09/2024 19:00 น."},
    {"id":"2", "image":"https://www.signupgenius.com/cms/socialMediaImages/5-Sign-Ups-for-School-Activities-1260x630.png", "name":"กินข้าว", "location":"ป.1/2", "date_time":"06/09/2024 20:00 น."},
    {"id":"3", "image":"https://kidz-village.ac.th/wp-content/uploads/2020/09/Hand-on-activity-min.jpg", "name":"ลงอ่าง", "location":"ป้อมยาม ปต.4", "date_time":"07/09/2024 21:00 น."},
    {"id":"4", "image":"https://www.21kschool.com/us/wp-content/uploads/sites/37/2022/09/10-Fun-Educational-Activities-to-Do-at-Home.png", "name":"แทงสนุ๊ก", "location":"บ้านพี่พูมตา", "date_time":"08/09/2024 22:00 น."},
  ]

  constructor() { }

  ngOnInit(): void {
      
  }

}