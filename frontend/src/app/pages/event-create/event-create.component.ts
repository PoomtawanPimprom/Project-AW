import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Event } from '../../interfaces/event.model';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  eventForm!: FormGroup;
  imageBase64: string = '';
  creator: string = '';
  images: string[] = [
    'https://elearning2.sut.ac.th/pluginfile.php/1/theme_suranaree/night_mainbgimg/1722512027/night_bg_sut_lg.jpg',
    'https://elearning2.sut.ac.th/pluginfile.php/1/theme_suranaree/mainbgimg/1722512027/E_learing%20art_completed.jpg'
  ];
  currentImage: string = this.images[0];
  imageOpacity: number = 1;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.creator = localStorage.getItem('username') || '';
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date_time: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });
    this.startImageSlideshow();
  }

  startImageSlideshow(): void {
    let currentIndex = 0;
    setInterval(() => {
      this.imageOpacity = 0;
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % this.images.length;
        this.currentImage = this.images[currentIndex];
        this.imageOpacity = 1;
      }, 600);
    }, 2000);
  }

  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imageBase64 = e.target.result;
  //       console.log('Base64 Image:', this.imageBase64);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          // Create a canvas element
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          // Set canvas size to scaled dimensions
          const maxWidth = 800; // Set maximum width as needed
          const maxHeight = 600; // Set maximum height as needed
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          // Draw image on canvas
          ctx.drawImage(img, 0, 0, width, height);
  
          // Get base64 data from canvas
          this.imageBase64 = canvas.toDataURL('image/jpeg', 0.7); // 0.7 is quality (0.0 to 1.0)
          console.log('Base64 Image:', this.imageBase64);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }  

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData: Event = {
        eventId: 0,
        name: this.eventForm.value.name,
        location: this.eventForm.value.location,
        date_time: this.eventForm.value.date_time,
        description: this.eventForm.value.description,
        image: this.imageBase64,
        creator: this.creator
      };

      this.http.post('http://localhost:3000/event', eventData).subscribe({
        next: (response) => {
          // console.log('Event created successfully:', response);
          this.alertMessage = 'เพิ่มกิจกรรมสำเร็จ';
          this.showAlert = true;
          setTimeout(() => {
            this.router.navigate(['/event/myevent']);
            this.showAlert = false;
          }, 2000);
        },
        error: (error) => {
          console.error('Error creating event:', error);
        }
      });
    }
  }
}