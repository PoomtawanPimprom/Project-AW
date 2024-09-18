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
  // ตัวแปรสำหรับเก็บข้อความแจ้งเตือน
  alertMessage: string = '';
  showAlert: boolean = false;
  event: Event[] = [];

  
  constructor(private http: HttpClient, private fs: FriendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.objectID_user = localStorage.getItem("_id");
    this.route.paramMap.subscribe((params) => {
      this.userId1 = params.get("id")!; // รับค่า userId1 จาก URL
    });

    this.fetchFriendData()
    this.applyFilter(); 

  }

  fetchFriendData() {
    const userId = this.objectID_user || "";
    // ดึงข้อมูลเพื่อนที่มีสถานะ accepted โดยพิจารณาให้ userId เป็นทั้ง userId1 และ userId2
    this.fs.getAllFriendPendingByUserId1(userId).subscribe(
      (friends) => {
        this.friends = friends;  // เก็บข้อมูลเพื่อนที่ได้จากทั้ง userId1 และ userId2
        console.log('Friends:', this.friends);
  
        this.applyFilter();  // กรองข้อมูลเมื่อดึงข้อมูลสำเร็จ
      },
      error => {
        console.error('Error fetching friends:', error);
      }
    );

    this.fs.getInfoUserId(userId).subscribe({
      next: user => {
        console.log('User:', user);
        this.user = user;
      },
      error: error => console.error('Error fetching user:', error)
    });
    
    const username = localStorage.getItem('username');
    
    if (username) {
      this.fs.getEventsByCreator(username).subscribe({
        next: (data) => {
          this.event = data;
        },
        error: (err) => {
          console.error('Error fetching events by creator:', err);
        }
      });
    }
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
      this.alertMessage = 'เป็นเพื่อนกันแล้ว'; // ตั้งค่าข้อความเมื่อทำสำเร็จ
      this.showAlert = true;
      this.fetchFriendData();
      this.applyFilter(); 
    },
    error => {
      console.error('Error updating friend status:', error);
      this.alertMessage = 'เกิดข้อผิดพลาดโปรดลองใหม่'; // ตั้งค่าข้อความเมื่อทำสำเร็จ
      this.showAlert = true;
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

  getImage(item: Friend): string {
    return item.userId1._id === this.objectID_user ? item.userId2.image : item.userId1.image;
  }
  
  getName(item: Friend): string {
    return item.userId1._id === this.objectID_user ? item.userId2.name : item.userId1.name;
  }
  
  getInstitute(item: Friend): string {
    return item.userId1._id === this.objectID_user ? item.userId2.institute : item.userId1.institute;
  }

  deleteFriend(friend: Friend): void {
    const userId1 = friend.userId1._id === this.objectID_user ? friend.userId1._id : friend.userId2._id;
    const userId2 = friend.userId1._id === this.objectID_user ? friend.userId2._id : friend.userId1._id;
    
    this.fs.deleteFriend(userId1, userId2).subscribe(
      (response) => {
        console.log('Friend deleted successfully:', response);
        this.alertMessage = 'ลบเพื่อนสำเร็จ'; // ตั้งค่าข้อความเมื่อทำสำเร็จ
        this.showAlert = true;
        this.fetchFriendData(); // อัพเดทรายการเพื่อนหลังจากลบแล้ว
        this.applyFilter(); 
      },
      (error) => {
        console.error('Error deleting friend:', error);
        this.alertMessage = 'เกิดข้อผิดพลาดในการลบเพื่อน';
        this.showAlert = true;
      }
    );
  }

 // ฟังก์ชันกรองข้อมูล
applyFilter(): void {
  this.filteredFriends = this.friends.filter((friend) => {
    // ตรวจสอบกรณีที่ userId เป็น userId1
    const isUserId1 = friend.userId1._id === this.objectID_user;
    // ตรวจสอบกรณีที่ userId เป็น userId2
    const isUserId2 = friend.userId2._id === this.objectID_user;
    
    // กรองตามสถาบัน
    const matchesInstitute = this.selectedInstitute === 'เพื่อนทั้งหมด' ||
      (isUserId1 && friend.userId2.institute === this.selectedInstitute) ||
      (isUserId2 && friend.userId1.institute === this.selectedInstitute);
    
    // กรองตามการค้นหา
    const matchesSearch = !this.search || 
      (isUserId1 && friend.userId2.name.toLowerCase().includes(this.search.toLowerCase())) ||
      (isUserId2 && friend.userId1.name.toLowerCase().includes(this.search.toLowerCase()));

    return matchesInstitute && matchesSearch;
  });
}

}