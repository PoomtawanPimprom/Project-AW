import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../interfaces/event.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  eventForm!: FormGroup;
  imageBase64: string = '';
  creator: string = '';
  eventId!: number;
  images: string[] = [
    'https://elearning2.sut.ac.th/pluginfile.php/1/theme_suranaree/night_mainbgimg/1722512027/night_bg_sut_lg.jpg',
    'https://elearning2.sut.ac.th/pluginfile.php/1/theme_suranaree/mainbgimg/1722512027/E_learing%20art_completed.jpg'
  ];
  currentImage: string = this.images[0];
  imageOpacity: number = 1;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.creator = localStorage.getItem('username') || '';
    this.eventId = Number(this.route.snapshot.paramMap.get('id')); // Get eventId from URL

    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date_time: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });

    // Fetch event data from the API
    this.http.get<Event>(`http://localhost:3000/event/${this.eventId}`).subscribe({
      next: (eventData) => {
        this.eventForm.patchValue({
          name: eventData.name,
          location: eventData.location,
          date_time: eventData.date_time,
          description: eventData.description,
        });
        this.imageBase64 = eventData.image; // Set base64 image if necessary
      },
      error: (error) => {
        console.error('Error fetching event data:', error);
      }
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          const maxWidth = 800;
          const maxHeight = 600;
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
  
          ctx.drawImage(img, 0, 0, width, height);
  
          this.imageBase64 = canvas.toDataURL('image/jpeg', 0.7);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData: Event = {
        eventId: this.eventId, // Use the existing eventId
        name: this.eventForm.value.name,
        location: this.eventForm.value.location,
        date_time: this.eventForm.value.date_time,
        description: this.eventForm.value.description,
        image: this.imageBase64,
        creator: this.creator
      };

      // Update event via PUT request
      this.http.put(`http://localhost:3000/event/${this.eventId}`, eventData).subscribe({
        next: (response) => {
          // console.log('Event updated successfully:', response);
          this.alertMessage = 'แก้ไขข้อมูลสำเร็จ';
          this.showAlert = true;
          setTimeout(() => {
            this.router.navigate(['/event/myevent']);
            this.showAlert = false;
          }, 2000);
        },
        error: (error) => {
          console.error('Error updating event:', error);
        }
      });
    }
  }

  onBackToMyEvent(): void {
    this.router.navigate(['/event/myevent']);
  }
  
}