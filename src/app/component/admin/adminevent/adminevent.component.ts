import { Component, OnInit } from '@angular/core';

import { Category } from "src/app/model/category";
import { Address } from 'src/app/model/address';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { NgForm, NgModel } from '@angular/forms';
import { EventRequest } from 'src/app/model/event-request';
import { AppResponse } from 'src/app/model/appResponse';

@Component({
  selector: 'app-adminevent',
  templateUrl: './adminevent.component.html',
  styleUrls: ['./adminevent.component.css']
})
export class AdmineventComponent implements OnInit {

  error: String = "";
  errornum: any;
  id: number = 0;

  events: Event[] = [];
  eventModel: EventRequest = {
    id: 0,
    title: "",
    desc: "",
    price: 0,
    totalAvailability: 0,
    balance: 0,
    eventDate: "",
    categoryId: 0,
    address: "",
    city: "",
    zipcode: 0
  }
  file='';

  constructor(private event: EventService) { }

  ngOnInit(): void {
    this.event.getEvents().subscribe({
      next: (response: any) => {
        this.events = response.data;

      },
      error: (err: { error: { error: { message: string; }; }; }) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  onSubmit(formValue: NgForm) {

    console.log(formValue.value);
    console.log(this.file);

    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('title', formValue.value.title);
    formData.append('image', this.file);
    formData.append('desc', formValue.value.desc);
    formData.append('price', formValue.value.price);
    formData.append('totalAvailability', formValue.value.totalTickets);
    formData.append('balance', formValue.value.balanceTickets);
    formData.append('eventDate', formValue.value.eventDate);
    formData.append('categoryId', formValue.value.category);
    formData.append('address', formValue.value.address);
    formData.append('city', formValue.value.city);
    formData.append('zipcode', formValue.value.zipcode);
 
    console.log(formData);
    

    if (this.id === 0) {
      this.event.postEvent(formData)
        .subscribe({
          next: (response: AppResponse) => {

            console.log(response.data);

            this.events = response.data;
          },
          error: (err: { error: { error: { message: string; }; }; }) => {
            console.log(err?.error?.error?.message);

          },
        });
    } else {

    }
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length) {
      this.file = fileInput.files[0];

      console.log('Selected file',this.file);
    }
  }

  deletecategory(id: number | undefined) {
    if (id !== undefined) {
      this.event.deleteEvent(id).subscribe({
        next: (response: any) => {
          this.events = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(",")
              ? message.split(",")[0]
              : message;
        },
      });
    }
  }
  editcategory(event: Event) {
    this.eventModel.id = event.id;
    this.eventModel.title = event.title;
    this.eventModel.desc = event.desc;
    this.eventModel.price = event.price;
    this.eventModel.totalAvailability = event.totalAvailability;
    this.eventModel.balance = event.balance;
    this.eventModel.eventDate = event.eventDate;
    this.eventModel.categoryId = event.eventCategory.id!;
    this.eventModel.address = event.address.address;
    this.eventModel.city = event.address.city;
    this.eventModel.zipcode = event.address.zipcode;
  }

}
