import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  username: string | null = '';
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUsername = localStorage.getItem('username');
      this.username = storedUsername ? storedUsername.toUpperCase() : '';
    }
  }

  onViewProfile(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.router.navigate([`/profile/${userId}`]);
    } else {
      console.log('User ID is not available');
    }
  }

  onLogout(): void {
    this.alertMessage = 'ออกจากระบบสำเร็จ';
    this.showAlert = true;
    setTimeout(() => {
      this.router.navigate(['/']);
      this.showAlert = false;
    }, 2000);
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }
}