import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FriendService } from '../../service/friend/friend.service';
import { ActivatedRoute } from '@angular/router';
import { userInterface } from '../../interfaces/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  users: userInterface[] = [];
  objectID_user: string | null = "";
  filteredUser: userInterface[] = []; // ใช้ interface Friend
  events: Event[] = [];


  constructor(private http: HttpClient, private fs: FriendService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.objectID_user = localStorage.getItem("_id");
    console.log('Object ID User:', this.objectID_user);
    this.fetchUsersData();
  }


  fetchUsersData(): void {
    this.fs.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUser = this.users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
