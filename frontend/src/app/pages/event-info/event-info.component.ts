import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../interfaces/event.model';
import { Participant } from '../../interfaces/participant.model';
import { DatePipe } from '@angular/common';
import { EventService } from '../../service/event.service';
import { ParticipantService } from '../../service/participant.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css',
  providers: [DatePipe]
})
export class EventInfoComponent implements OnInit {

  event: Event[] = [];
  selectedEvent?: Event;
  isJoined: boolean = false;
  member: string = '';
  participantCount: number = 0;
  showAlert: boolean = false;
  alertMessage: string = '';
  showConfirm: boolean = false;
  confirmMessage: string = '';

  constructor(
    private route: ActivatedRoute, 
    private datePipe: DatePipe,
    private eventService: EventService, 
    private participantService: ParticipantService, 
  ) { }

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (data) => {
          this.selectedEvent = data;
        },
        error: (err) => {
          console.error('Error fetching event:', err);
        },
      });
    }

    this.participantService.getParticipantCount(eventId).subscribe({
      next: (response) => {
        this.participantCount = response.count;
      },
      error: (err) => {
        console.error('Error fetching participant count:', err);
      }
    });

    this.member = localStorage.getItem('username') || '';
    if (this.member) {
      this.participantService.getParticipantStatus(this.member, eventId).subscribe({
        next: (participant) => {
          if (participant) {
            this.isJoined = participant.status === 'เข้าร่วม';
          }
        },
        error: (err) => {
          console.error('Error checking participant status:', err);
        }
      });
    }
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    const yearBuddhist = dateObj.getFullYear() + 543;
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const monthName = months[dateObj.getMonth()];
    return `${dateObj.getDate()} ${monthName} ${yearBuddhist} เวลา ${this.datePipe.transform(dateObj, 'HH:mm')} น.`;
  }

  onJoinEvent(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventId && this.member) {
      if (this.isJoined) {
        this.confirmMessage = "คุณต้องการยกเลิกการเข้าร่วมกิจกรรมนี้ ?";
        this.showConfirm = true;
      } else {
        const participantData: Participant = {
          participantId: 0,
          member: this.member,
          eventId: eventId,
          status: 'เข้าร่วม',
        };

        this.participantService.joinEvent(participantData).subscribe({
          next: () => {
            this.isJoined = true;
            this.alertMessage = 'เข้าร่วมกิจกรรมสำเร็จ';
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 2000);
            this.participantCount += 1;
          },
          error: (error) => {
            console.error('Error joining the event:', error);
          }
        });
      }
    }
  }

  onConfirmLeave(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventId && this.member) {
      this.participantService.leaveEvent(this.member, eventId).subscribe({
        next: () => {
          this.isJoined = false;
          this.alertMessage = 'ยกเลิกการเข้าร่วมกิจกรรมสำเร็จ';
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
          this.participantCount -= 1;
        },
        error: (error) => {
          console.error('Error leaving the event:', error);
        }
      });
    }
    this.showConfirm = false;
  }

  onCloseConfirm() {
    this.showConfirm = false;
  }

}