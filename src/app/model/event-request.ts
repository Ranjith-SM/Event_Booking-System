export interface EventRequest {
    id?:number,
    title:string,
    desc:string,
    price:number,
    totalAvailability:number,
    balance: number,
    eventDate: string,
    categoryId: number,
    address: string,
    city: string,
    zipcode:number
}
