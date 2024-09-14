import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend/friend.service';
import { Friend } from '../../interfaces/friend.medel'; // Import interface
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; 
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  filteredFriends: Friend[] = []; // ใช้ interface Friend
  selectedInstitute: string = 'เพื่อนทั้งหมด'; // Default is to show all friends
  search: string = '';
  
  friends: Friend[] = [];
  userId1!: string; // ประกาศตัวแปร userId1
  objectID_user!: string | null
  user: any;
  
  constructor(private http: HttpClient, private fs: FriendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.objectID_user = localStorage.getItem("_id");
    this.route.paramMap.subscribe((params) => {
      this.userId1 = params.get("id")!; // รับค่า userId1 จาก URL
    });
    this.fetchFriendData()

  }

  fetchFriendData() {
    const userId = this.objectID_user || "";
    
    forkJoin({
      friends: this.fs.getAllFriendsAcceptedByUserId1(userId),
      user: this.fs.getImforUserId1(userId)
    }).subscribe(({ friends, user }) => {
      this.friends = friends;  // ข้อมูลเพื่อน
      this.user = user;  // ข้อมูลของผู้ใช้
      console.log(this.friends, this.user);

      this.applyFilter();  // กรองข้อมูลเมื่อดึงข้อมูลสำเร็จ
    },
    error => {
      console.error('Error fetching data:', error);
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
