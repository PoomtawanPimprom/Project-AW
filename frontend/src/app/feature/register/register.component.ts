import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  onSubmit() {
    this.authService.signUp(this.username, this.email, this.password)
      .subscribe({
        next: (response) => {
          if (response.state) {
            this.alertMessage = 'สมัครสมาชิกสำเร็จ';
            this.showAlert = true;

            setTimeout(() => {
              this.router.navigate(['/login']);
              this.showAlert = false;
            }, 2000);
          } else {
            this.alertMessage = response.message;
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 2000);
          }
        },
        error: (errorResponse) => {
          this.alertMessage = errorResponse.error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
        }
      });
  }
}
