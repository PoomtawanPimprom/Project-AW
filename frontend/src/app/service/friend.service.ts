import { Injectable } from '@angular/core';
import { Friend } from '../interfaces/friend.medel';
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  friend: Friend[] = [
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
      "faculty": "สำนักวิชาเทคโนโลยีสังคม",
      "status": "accepted"
    },
    {
      "id": "3",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "วีระ โชติพงศ์",
      "faculty": "สำนักวิชาวิศวกรรมศาสตร์",
      "status": "accepted"
    },
    {
      "id": "4",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "มณีรัตน์ รัตนบรรเทิง",
      "faculty": "สำนักวิชาแพทยศาสตร์",
      "status": "pending"
    },
    {
      "id": "5",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "ธนภัทร แสนเมือง",
      "faculty": "สำนักวิชาแพทยศาสตร์",
      "status": "pending"
    },
    {
      "id": "6",
      "image": "https://i.pinimg.com/736x/26/25/62/2625624d1249b9ca751e5ac2d9403d86.jpg",
      "name": "สมพงษ์ กี่งใบทอง",
      "faculty": "สำนักวิชาวิทยาศาสตร์",
      "status": "accepted"
    },
    
  ];

    filteredFriends = this.friend;
    selectedFaculty: string = 'เพื่อนทั้งหมด';

  constructor() { }

  //คนทั้งหมด
  getAllFriends(){
    return this.friend;
  }

  //เป็นเพื่อนแล้ว
  getAcceptedFriends() {
    return this.friend.filter(friend => friend.status === 'accepted');
  }

  // รอดำเนินการ
  getPendingRequests() {
    return this.friend.filter(friend => friend.status === 'pending');
  }

  onFilterInstitute(faculty: string): void {
  this.selectedFaculty = faculty;
  if (faculty === 'เพื่อนทั้งหมด') {
    this.filteredFriends = this.friend;
  } else {
    this.filteredFriends = this.friend.filter((f: Friend) => f.faculty === faculty);
  }
}
}
