import { Component, OnInit } from '@angular/core';

interface Friend {
  id: string;
  image: string;
  name: string;
  institute: string;
  status: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  
  filteredFriends: Friend[] = [];
  selectedInstitute: string = 'เพื่อนทั้งหมด'; // Default is to show all friends
  search: string = '';

  constructor() {}

  ngOnInit(): void {
  }
  
}
