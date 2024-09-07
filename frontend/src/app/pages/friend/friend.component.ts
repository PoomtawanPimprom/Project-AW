import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  filteredFriends: any[] = [];
  selectedFaculty: string = 'เพื่อนทั้งหมด'; // Default is to show all friends
  search: string = '';

  constructor(private fs: FriendService) {}

  ngOnInit(): void {
    this.getAcceptedFriends(); // เรียก getAcceptedFriends() เมื่อคอมโพเนนต์โหลด
  }

  getAcceptedFriends() {
    const allFriends = this.fs.getAcceptedFriends(); // ดึงข้อมูลเพื่อนทั้งหมดจาก service
    this.filteredFriends = allFriends; // ตั้งค่า filteredFriends เป็นรายการเพื่อนทั้งหมด
  }

  onFilterInstitute(faculty: string): void {
    this.selectedFaculty = faculty; // เก็บสำนักวิชาที่ถูกเลือก
    this.applyFilter(); // เรียกฟังก์ชันกรองข้อมูล
  }


  onSearchFriend(): void {
    this.applyFilter(); // เรียกฟังก์ชันกรองข้อมูลเมื่อค้นหา
  }

  applyFilter(): void {
    const allFriends = this.fs.getAcceptedFriends(); // ดึงข้อมูลเพื่อนทั้งหมดจาก service
    // กรองเพื่อนตามสำนักวิชาและคำค้นหา
    this.filteredFriends = allFriends.filter((friend: any) => {
      const matchesFaculty = this.selectedFaculty === 'เพื่อนทั้งหมด' || friend.faculty === this.selectedFaculty;
      const matchesSearch = friend.name.toLowerCase().includes(this.search.toLowerCase());
      return matchesFaculty && matchesSearch;
    });
  }
}
