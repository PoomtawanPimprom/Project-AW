import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  username: string | null = '';

  constructor() {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }
}