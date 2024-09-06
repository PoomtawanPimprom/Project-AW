import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent implements OnInit {


  friend: any = [
    {
      "id": "1",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "สมพร กี่งใบทอง",
      "faculty": "สำนักวิชาวิทยาศาสตร์",
      "status": "accepted"
    },
    {
      "id": "2",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "นวลน้อย ปรีชา",
      "faculty": "สำนักวิชาวิศวกรรมศาสตร์",
      "status": "accepted"
    },
    {
      "id": "3",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "วีระ โชติพงศ์",
      "faculty": "สำนักวิชาสังคมศาสตร์",
      "status": "accepted"
    },
    {
      "id": "4",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "มณีรัตน์ รัตนบรรเทิง",
      "faculty": "สำนักวิชาการจัดการ",
      "status": "pending"
    },
    {
      "id": "5",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "ธนภัทร แสนเมือง",
      "faculty": "สำนักวิชาศึกษาทั่วไป",
      "status": "pending"
    },
    
  ];
  


  institute!: string;

  constructor() {}

  ngOnInit(): void {
  }

  onFilterInstitute(receiver: string): void {
    this.institute = receiver;
    console.log("Filter: ", this.institute)
  }

}
