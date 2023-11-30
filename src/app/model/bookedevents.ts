import { AppUser } from "./appUser";
import { Event } from "./event";
import { People } from "./people";

export interface Bookedevents {
    id:number,
    eventTicket: Event,
    appUser: AppUser,
    ticket: number,
    count:number,
    bookedat?:string,
    userDetails: People[]
}
