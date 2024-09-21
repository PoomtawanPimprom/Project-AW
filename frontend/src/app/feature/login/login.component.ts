import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    const storedUsername = localStorage.getItem('rememberedUsername');
    if (storedUsername) {
      this.username = storedUsername;
      this.rememberMe = true;
    }
  }

  onSubmit() {
    const payload = {
      username: this.username,
      password: this.password
    };

    this.authService.signIn(this.username, this.password)
      .subscribe({
        next: (response) => {
          if (response.state) {
            this.alertMessage = 'เข้าสู่ระบบสำเร็จ';
            this.showAlert = true;

            if (this.rememberMe) {
              localStorage.setItem('rememberedUsername', this.username);
            } else {
              localStorage.removeItem('rememberedUsername');
            }

            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.result._id);
            localStorage.setItem('userId', response.result.userId);
            localStorage.setItem('username', payload.username);

            setTimeout(() => {
              this.router.navigate(['/main']);
              this.showAlert = false;
            }, 2000);
          } else {
            this.alertMessage = 'รหัสผ่านไม่ถูกต้อง';
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 2000);
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.alertMessage = 'ไม่พบข้อมูลผู้ใช้งาน';
          } else {
            this.alertMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
          }
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
        }
      });
  }
}
