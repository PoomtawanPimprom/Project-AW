import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend/friend.service';
import { Friend } from '../../interfaces/friend.medel';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css'] // เปลี่ยนจาก styleUrl เป็น styleUrls
})
export class FriendRequestComponent implements OnInit {

  
  filteredFriends: Friend[] = []; // ใช้ interface Friend
  selectedInstitute: string = 'เพื่อนทั้งหมด'; // Default is to show all friends
  search: string = '';
  
  friends: Friend[] = [];
  userId1: string | null = "";
  userId2: string | null = "";
  objectID_user: string | null = "";
  user: any;
  
  constructor(private http: HttpClient, private fs: FriendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.objectID_user = localStorage.getItem("_id");
    this.userId1 = this.objectID_user;
  
    this.route.paramMap.subscribe((params) => {
      this.userId1 = params.get("id")!;
    });
  
    // ตรวจสอบว่ามีการเรียกฟังก์ชันนี้
    this.fetchFriendData(); 
  }  

  fetchFriendData() {
  const userId = this.objectID_user || "";

  this.fs.getAllFriendPendingByUserId1(userId).subscribe({
    next: friends => {
      console.log('Friends:', friends);
      this.friends = friends;
    },
    error: error => console.error('Error fetching friends:', error)
  });

  this.fs.getInfoUserId(userId).subscribe({
    next: user => {
      console.log('User:', user);
      this.user = user;
    },
    error: error => console.error('Error fetching user:', error)
  });
}
  
  acceptedFriend(user2: any): void {
  if (user2 && user2._id) {
    this.userId2 = user2._id;  // ดึงค่า _id ของ user2
  } else {
    console.error('User2 does not have _id');
    return;
  }
  
  if (!this.objectID_user || !this.userId2) {
    console.error('User IDs are required');
    return;
  }

  this.fs.updateFriendStatusAccepted(this.objectID_user, this.userId2).subscribe(
    response => {
      console.log('Friend status updated successfully:', response);
      this.fetchFriendData();
    },
    error => {
      console.error('Error updating friend status:', error);
    }
  );

}


  // acceptedFriend() {
  //   this.userId2 = "66e2efac5716276cd708bc9d";
    
  //   if (!this.objectID_user || !this.userId2) {
  //     console.error('User IDs are required');
  //     return;
  //   }
  
  //   this.fs.updateFriendStatus(this.objectID_user, this.userId2).subscribe(
  //     response => {
  //       console.log('Friend status updated successfully:', response);
  //       this.fetchFriendData();
  //     },
  //     error => {
  //       console.error('Error updating friend status:', error);
  //     }
  //   );
  // }
  
    // ฟังก์ชันค้นหาเพื่อน
  onSearchFriend(): void {
    this.applyFilter(); // กรองข้อมูลเพื่อนเมื่อทำการค้นหา
  }

  // ฟังก์ชันกรองเพื่อนตามสถาบัน
  onFilterInstitute(institute: string): void {
    this.selectedInstitute = institute;
    this.applyFilter(); // เรียกฟังก์ชันกรองข้อมูล
  }

  // ฟังก์ชันกรองข้อมูล
  applyFilter(): void {
    this.filteredFriends = this.friends.filter((friends) => {
      const matchesInstitute = this.selectedInstitute === 'เพื่อนทั้งหมด' || friends.userId2.institute === this.selectedInstitute;
      const matchesSearch = !this.search || friends.userId2.name.toLowerCase().includes(this.search.toLowerCase());
      return matchesInstitute && matchesSearch;
    });
  }
}