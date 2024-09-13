import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../service/friend/friend.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; 
import { userInterface } from '../../interfaces/user.model';
@Component({
  selector: 'app-friend-info',
  templateUrl: './friend-info.component.html',
  styleUrl: './friend-info.component.css'
})
export class FriendInfoComponent implements OnInit {

  
  filteredUser: userInterface[] = []; // ใช้ interface Friend
  selectedInstitute: string = 'เพื่อนทั้งหมด'; // Default is to show all friends
  search: string = '';
  selectedFriend: any = null;

  users: userInterface[] = [];
  userId1!: string; // ประกาศตัวแปร userId1
  
  constructor(private http: HttpClient, private fs: FriendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId1 = params.get("id")!; // รับค่า userId1 จาก URL
    });
    this.fetchUsersData()
  }

  fetchUsersData(): void {
    this.fs.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUser = this.users;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
    this.applyFilter();
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
    this.filteredUser = this.users.filter((users) => {
      const matchesInstitute = this.selectedInstitute === 'เพื่อนทั้งหมด' || users.institute === this.selectedInstitute;
      const matchesSearch = !this.search || users.name.toLowerCase().includes(this.search.toLowerCase());
      return matchesInstitute && matchesSearch;
    });
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


}
