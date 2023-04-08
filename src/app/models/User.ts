import { Booking } from "./Booking";

export  interface User {
  id: number;
  name: string;
  surname: string;
  role: string;
  username: string;
  email: string;
  telephone: string;
  bookings: Booking[];

}
