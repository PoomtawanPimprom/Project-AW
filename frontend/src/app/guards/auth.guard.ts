import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      alert("หมดเวลาเข้าใช้งาน กรุณาเข้าสู่ระบบอีกครั้ง");
      this.authService.removeData();
      this.router.navigate(['/login']);
      return false;
    }
  }
}