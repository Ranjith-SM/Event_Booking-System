import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppResponse } from "../model/appResponse";
import { urlEndpoint } from "../utils/constant";
import { Category } from "../model/category";
import { EventRequest } from "../model/event-request";
import { EventBooking } from "../model/event-booking";

@Injectable({
  providedIn: "root",
})
export class EventService {


  constructor(private http: HttpClient) { }

  getEvents(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/event/all`
    );
  }

  postEvent(event: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/event`,event);
  }

  putEvent(event: EventRequest): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/event`,
      event
    );
  }

  deleteEvent(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/event/${id}`
    );
  }

  // users part
  geteventsforusers() {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/event/all`
    );
  }

  bookEvent(eventBooking: EventBooking) {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/event`,
      eventBooking
    );
  }
}
