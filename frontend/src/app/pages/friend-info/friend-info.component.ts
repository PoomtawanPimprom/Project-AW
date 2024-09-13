import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';

@Component({
  selector: 'app-friend-info',
  templateUrl: './friend-info.component.html',
  styleUrl: './friend-info.component.css'
})
export class FriendInfoComponent implements OnInit {

  
  filteredFriends: any[] = [];
  selectedInstitute: string = 'เพื่อนทั้งหมด'; // Default is to show all friends
  search: string = '';
  selectedFriend: any = null;

  constructor(private fs: FriendService) {}

  ngOnInit(): void {
    // this.getAllFriends(); // เรียก getAcceptedFriends() เมื่อคอมโพเนนต์โหลด
  }

  // getAllFriends() {
  //   const allFriends = this.fs.getAllFriends(); // ดึงข้อมูลเพื่อนทั้งหมดจาก service
  //   this.filteredFriends = allFriends; // ตั้งค่า filteredFriends เป็นรายการเพื่อนทั้งหมด
  // }

  onFilterInstitute(institute: string): void {
    this.selectedInstitute = institute; // เก็บสำนักวิชาที่ถูกเลือก
    this.applyFilter(); // เรียกฟังก์ชันกรองข้อมูล
  }

  onSearchFriend(): void {
    this.applyFilter(); // เรียกฟังก์ชันกรองข้อมูลเมื่อค้นหา
  }

  isPendingRequest(item: any): boolean {
    return item.status === 'pending'; // Assuming 'status' field contains the friend request status
  }

  openFriendModal(friend: any): void {
    this.selectedFriend = friend; // Set the selected friend's details
  }

  closeModal(): void {
    this.selectedFriend = null; // Close the modal by setting selectedFriend to null
  }

  applyFilter(): void {
    // const allFriends = this.fs.getAllFriends(); // ดึงข้อมูลเพื่อนทั้งหมดจาก service
    // กรองเพื่อนตามสำนักวิชาและคำค้นหา
    // this.filteredFriends = allFriends.filter((friend: any) => {
    //   const matchesinstitute = this.selectedInstitute === 'เพื่อนทั้งหมด' || friend.institute === this.selectedInstitute;
    //   const matchesSearch = friend.name.toLowerCase().includes(this.search.toLowerCase());
    //   return matchesinstitute && matchesSearch;
    // });
  }
}
