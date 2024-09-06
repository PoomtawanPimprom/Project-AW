import { Component, OnInit } from '@angular/core';

interface Friend {
  id: string;
  image: string;
  name: string;
  faculty: string;
  status: string;
}

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent implements OnInit {

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
    
  ];
  
  filteredFriends: Friend[] = [];
  selectedFaculty: string = 'เพื่อนทั้งหมด'; // Default is to show all friends
  search: string = '';

  constructor() {}

  ngOnInit(): void {
    this.filteredFriends = this.friend;
  }

  onFilterInstitute(faculty: string): void {
    this.selectedFaculty = faculty;
    if (faculty === 'เพื่อนทั้งหมด') {
      this.filteredFriends = this.friend;
    } else {
      // Filter friends where the faculty matches
      this.filteredFriends = this.friend.filter((f: Friend) => f.faculty === faculty);
    }
  }

  onSearchFriend(): void {
    // Reapply the faculty filter and include the search term
    this.filteredFriends = this.friend.filter((f: Friend) => {
      const matchesFaculty = this.selectedFaculty === 'เพื่อนทั้งหมด' || f.faculty === this.selectedFaculty;
      const matchesSearch = f.name.toLowerCase().includes(this.search.toLowerCase());
      return matchesFaculty && matchesSearch;
    });
  }
  
}
