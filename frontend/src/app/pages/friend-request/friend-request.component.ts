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
  //ยังไม่ get
  objectID_user: string | null = "";
  
  constructor(private http: HttpClient, private fs: FriendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.objectID_user = localStorage.getItem("_id");
    this.userId1 = this.objectID_user;
    this.route.paramMap.subscribe((params) => {
      this.userId1 = params.get("id")!; // รับค่า userId1 จาก URL
    });
    this.fetchFriendData()

  }

  fetchFriendData() {
    this.fs.getAllFriendPendingByUserId1(this.objectID_user || "")
      .subscribe(result => {
        this.friends = result;
        console.log(this.friends);
        this.applyFilter();  // กรองข้อมูลเมื่อดึงข้อมูลเพื่อนสำเร็จ
      });
  }

  onRecordUserId(userId2: string): void{
    this.userId2 = userId2;
    console.log(this.userId2)
  }

  acceptedFriend() {
    if (!this.userId1 || !this.userId2) {
      console.error('User IDs are required');
      return;
    }
  
    this.fs.updateFriendStatus(this.userId1, this.userId2).subscribe(
      response => {
        console.log('Friend status updated successfully:', response);
        this.fetchFriendData();
      },
      error => {
        console.error('Error updating friend status:', error);
      }
    );
  }
  
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