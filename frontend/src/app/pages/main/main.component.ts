import { Component, OnInit } from '@angular/core';
import { userInterface } from '../../interfaces/user.model';
import { Event } from '../../interfaces/event.model';
import { HttpClient } from '@angular/common/http';
import { FriendService } from '../../service/friend/friend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  users: userInterface[] = [];
  objectID_user: string | null = "";
  filteredUser: userInterface[] = []; // ใช้ interface Friend
  events: Event[] = [];


  constructor(private http: HttpClient, private fs: FriendService, private route: ActivatedRoute) {}

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

    // this.fs.getEvents().subscribe({
    //   next: (data) => {
    //     this.events = data;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching users:', error);
    //   }
    // });
  }

  

}
