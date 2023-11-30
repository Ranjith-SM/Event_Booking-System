import { People } from "./people";

export interface EventBooking {
    eventId:number,
    userId:number,
    count:number,
    userDetails: People[]
}
