import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { AuthService } from 'src/app/service/auth.service';
import { AppUser } from 'src/app/model/appUser';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { urlEndpoint } from 'src/app/utils/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
loadImage(id: number) {
  return `${urlEndpoint.baseUrl}/images/downloadFile/${id}`;
}
  user:AppUser;
  events:Event[] = [];
  popularEvents:Event[] = [];
  error: string = "";
  
  constructor(private auth: AuthService, private event:EventService) {
    this.user  = auth.getLoggedIn();

    this.event.geteventsforusers().subscribe({
      next: (response: any) => {
        this.events = response.data;
        this.popularEvents = this.events.slice(0,3);
      },
      error: (err: { error: { error: { message: string; }; }; }) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
}
