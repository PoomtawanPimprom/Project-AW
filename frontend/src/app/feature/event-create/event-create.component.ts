import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../../interfaces/event.model';
import { CustomValidators } from '../../customs/customValidators';
import { handleFileChange } from '../../customs/imageUtils';
import { EventService } from '../../service/event/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  eventForm!: FormGroup;
  imageBase64: string = '';
  creatorID: string = '';
  images: string[] = [
    'https://elearning2.sut.ac.th/pluginfile.php/1/theme_suranaree/night_mainbgimg/1722512027/night_bg_sut_lg.jpg',
    'https://elearning2.sut.ac.th/pluginfile.php/1/theme_suranaree/mainbgimg/1722512027/E_learing%20art_completed.jpg'
  ];
  currentImage: string = this.images[0];
  imageOpacity: number = 1;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private eventService: EventService,
  ) {}

  ngOnInit(): void {
    this.creatorID = localStorage.getItem('_id') || '';
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, CustomValidators.forbiddenWords(['กู', 'มึง', 'สัส', 'ควย'])]],
      location: ['', [Validators.required, CustomValidators.maxLength(50)]],
      date_time: ['', [Validators.required, CustomValidators.notPastDate]],
      description: ['', [Validators.required, CustomValidators.forbiddenWords(['กู', 'มึง', 'สัส', 'ควย']), CustomValidators.maxLength(200)]],
      image: ['', [CustomValidators.imageFile]]
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
    handleFileChange(event, (base64: string) => {
      this.imageBase64 = base64;
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData: Event = {
        _id: '',
        eventId: "0",
        name: this.eventForm.value.name,
        location: this.eventForm.value.location,
        date_time: this.eventForm.value.date_time,
        description: this.eventForm.value.description,
        image: this.imageBase64,
        creator: this.creatorID
      };

      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
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

  onBackToMyEvent(): void {
    this.router.navigate(['/event/myevent']);
  }
  
}