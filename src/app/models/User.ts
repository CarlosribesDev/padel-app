import { Booking } from "./Booking";

export  class User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  bookings: Booking[];

  constructor(json: any = {}){
    this.id = json.id;
    this.name = json.name;
    this.surname = json.surname;
    this.username = json.username;
    this.email = json.email;
    this.bookings = json.bookings;
  }
}
