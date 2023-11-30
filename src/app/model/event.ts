import { Address } from "./address";
import { Category } from "./category";

export interface Event {
    id?: number;
  title: string;
  desc: string,
  price: number,
  totalAvailability:number,
  balance:number,
  eventCategory: Category,
  eventDate: string,
  address:Address,
}
