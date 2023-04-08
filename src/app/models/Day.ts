import { Booking } from './Booking';

export class Day {
    id:number;
    date: Date;
    bookings: Booking[];
    busy: boolean;

    constructor(json: any = {}){
      this.id = json.id;
      this.date = json.date;
      this.bookings = json.bookings;
      this.busy = json.busy;
    }
}
