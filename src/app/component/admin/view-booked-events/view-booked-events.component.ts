import { Component, OnInit } from '@angular/core';
import { Bookedevents } from 'src/app/model/bookedevents';
import { BookedEventsService } from 'src/app/service/booked-events.service';
import { urlEndpoint } from 'src/app/utils/constant';

@Component({
  selector: 'app-view-booked-events',
  templateUrl: './view-booked-events.component.html',
  styleUrls: ['./view-booked-events.component.scss']
})
export class ViewBookedEventsComponent implements OnInit {
getImage(id: number|undefined) {
  return `${urlEndpoint.baseUrl}/images/downloadFile/${id}`;
}

  error:string = "";
  bookedEvents: Bookedevents[] = []

  constructor(private bookedeventservice:BookedEventsService) {}

  ngOnInit(): void {
    this.bookedeventservice.getBookedevents().subscribe({
      next: (response: any) => {    
        console.log(response.data);
            
        this.bookedEvents = response.data;

      },
      error: (err: { error: { error: { message: string; }; }; }) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }

}
