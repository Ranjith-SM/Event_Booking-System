import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { setDate } from 'date-fns/esm/fp';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Bookedevents } from 'src/app/model/bookedevents';
import { Category } from 'src/app/model/category';
import { Event } from 'src/app/model/event';
import { EventBooking } from 'src/app/model/event-booking';
import { People } from 'src/app/model/people';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
import { EventService } from 'src/app/service/event.service';
import { LoaderService } from 'src/app/service/loader.service';
import { StorageService } from 'src/app/service/storage.service';
import { urlEndpoint } from 'src/app/utils/constant';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  Lottie: any;
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  showLottie() {
    this.Lottie = true;

    setTimeout(() => {
      this.Lottie = false
    }, 2000);
  }
  loadImage(id: number): any {
    return `${urlEndpoint.baseUrl}/images/downloadFile/${id}`;
  }

  min: any;
  error: String = "";
  errornum: any;
  name: string = "";
  gender: string = "";
  age: number = 0;
  eventId: number = 0;
  // eventBooking!: FormGroup;
  // details!: FormArray;

  events: Event[] = [];
  categories: Category[] = [];
  bookedEvents: Bookedevents[] = [];


  peoples: People[] = [];
  people: People = {
    eventId: 0,
    name: "",
    gender: "",
    age: 0
  }
  eventBooking: EventBooking = {
    eventId: 0,
    userId: 0,
    count: 0,
    userDetails: []
  }
  userCount: any;
  selectedTickets: any;
  searchEvent: string = "";
  

  constructor(private event: EventService, private formbuilder: FormBuilder, private auth: AuthService, private storage: StorageService, private http: HttpClient, public loaderService: LoaderService, private category: CategoryService) {
    this.selectedTickets = "select"
  }

  ngOnInit(): void {
    this.event.geteventsforusers().subscribe({
      next: (response: any) => {
        this.events = response.data;
      },
      error: (err: { error: { error: { message: string; }; }; }) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });

    this.category.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;

      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });


  }
  getUserDetails() {
    this.userCount = this.selectedTickets
    for (let i = 0; i < this.userCount; i++) {
      this.peoples.push({
        eventId: this.eventId,
        name: "",
        gender: "",
        age: 0
      })
    }
  }
  onSubmit(_t63: NgForm) {
    const user = this.auth.getLoggedIn();
    this.eventBooking.eventId = this.eventId;
    this.eventBooking.userId = user.id;
    this.eventBooking.count = this.selectedTickets;


    this.eventBooking.userDetails = this.peoples;
    console.log(this.eventBooking)
    this.event.bookEvent(this.eventBooking).subscribe({
      next: (response: any) => {
        console.log(response.data);

        this.bookedEvents = response.data;
        this.storage.saveBookedEvent(this.bookedEvents);

      },
      error: (err: { error: { error: { message: string; }; }; }) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  sndEventId(id: number) {
    this.eventId = id;
  }

  getCategoryEvents(id: number){
    
  }

}