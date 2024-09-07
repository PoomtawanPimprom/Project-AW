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
    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername ? storedUsername.toUpperCase() : '';
  }
}