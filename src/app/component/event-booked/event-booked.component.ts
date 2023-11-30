import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Bookedevents } from 'src/app/model/bookedevents';
import { Event } from 'src/app/model/event';
import { AuthService } from 'src/app/service/auth.service';
import { BookedEventsService } from 'src/app/service/booked-events.service';
import { EventService } from 'src/app/service/event.service';
import { urlEndpoint } from 'src/app/utils/constant';

@Component({
  selector: 'app-event-booked',
  templateUrl: './event-booked.component.html',
  styleUrls: ['./event-booked.component.css']
})
export class EventBookedComponent implements OnInit{
loadImage(id: number) {
  return `${urlEndpoint.baseUrl}/images/downloadFile/${id}`;
}
getImage(id:number) {
  return `${urlEndpoint.baseUrl}/images/downloadFile/${id}`;
}
  events:Event[] = [];
  suggestEvent!: Event; 
  // random = Math.floor(Math.random() * this.events.length);
  // eventr:Event[] = this.events[this.random];
  bookedEvents:Bookedevents[] = [];
  error: string = "";
  user!: AppUser;

  constructor(private bookedEventsService:BookedEventsService, private auth:AuthService, private event: EventService) {}

  ngOnInit(): void {
    this.user = this.auth.getLoggedIn();
    this.bookedEventsService.getBookedeventsofUser(this.user.id).subscribe({
      next: (response: any) => {
        console.log(response.data);

        this.bookedEvents = response.data;
        console.log(this.bookedEvents);
        
      },
      error: (err: { error: { error: { message: string; }; }; }) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });

    this.event.geteventsforusers().subscribe({
      next: (response: any) => {
        this.events = response.data;
        const randomIndex = Math.floor(Math.random() * this.events.length);
        this.suggestEvent = this.events[randomIndex];

      },
      error: (err: { error: { error: { message: string; }; }; }) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  
  
}
