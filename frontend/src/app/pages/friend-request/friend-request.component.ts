import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend.service';
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
  userId1!: string; // ประกาศตัวแปร userId1
  //ยังไม่ get
  objectID_user: string = "66e2e9355716276cd708bc7f"
  
  constructor(private http: HttpClient, private fs: FriendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId1 = params.get("id")!; // รับค่า userId1 จาก URL
    });
    this.fetchFriendData()

  }

  fetchFriendData() {
    this.fs.getAllFriendPendingByUserId1(this.objectID_user)
      .subscribe(result => {
        this.friends = result;
        console.log(this.friends);
        this.applyFilter();  // กรองข้อมูลเมื่อดึงข้อมูลเพื่อนสำเร็จ
      });
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