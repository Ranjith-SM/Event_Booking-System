import { Component } from '@angular/core';
import { Chart, ChartData, ChartDataset, ChartType, LabelItem } from 'chart.js';

import { Bookedevents } from 'src/app/model/bookedevents';
import { BookedEventsService } from 'src/app/service/booked-events.service';
import { format, parse } from "date-fns";

@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent {
  bookedEvents: Bookedevents[] = []
  error: string = "";
  eventDates = new Map<string, number>();
  total: number = 0;
  keyArray: string[] = [];
  valueArray: number[] = [];


  dataSet = {
    labels: "Booked-Events",
    datasets: []
  };
  

  constructor(private bookedeventservice: BookedEventsService) { }

  ngOnInit(): void {
    this.bookedeventservice.getBookedevents().subscribe({
      next: (response: any) => {


        this.bookedEvents = response.data;

        // for (let eventDate of this.bookedEvents) {
        //   this.eventDates.set(eventDate.eventTicket.eventDate.slice(0, 10));
        //   // console.log(this.eventDates);
        // }

        let count: number = 0;
        for (let eventDate of this.bookedEvents) {
          if (!this.eventDates.has(eventDate.eventTicket.eventDate)) {
            count += eventDate.count;
            this.eventDates.set(eventDate.eventTicket.eventDate.slice(0,10), count);
          } else {
            let add = this.eventDates.get(eventDate.eventTicket.eventDate)!;
            add += eventDate.count;
            this.eventDates.set(eventDate.eventTicket.eventDate, add);
          }
        }
       
        this.keyArray = Array.from(this.eventDates.keys());
        this.valueArray = Array.from(this.eventDates.values());
        
        let canvas = <HTMLCanvasElement>document.getElementById('linechart')!;
        let ctx = canvas.getContext('2d')!;
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.keyArray,
              datasets: [{
                  label: 'Booked-Events',
                  data: this.valueArray,
                  backgroundColor: '#32609a',
                  borderColor: 'black',
                  fill: true,
                  tension: 0.5,
                  borderWidth: 1
              }],
              
          },
          
      });


        console.log(Array.from(this.eventDates.keys()));
        console.log(this.valueArray);


      },
      error: (err: { error: { error: { message: string; }; }; }) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }

}
