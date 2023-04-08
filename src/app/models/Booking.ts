import { Game } from "./Game";
import { UserWithoutBookings } from "./UserWithoutBookings";

export class Booking {
  id:number ;
  hour: string;
  date: Date;
  game: Game;
  dayId: number;
  user: UserWithoutBookings;

  constructor(json: any = {}){
    this.id = json.id;
    this.hour = json.hour;
    this.date = json.date;
    this.game = json.game;
    this.dayId = json.dayId;
    this.user = json.user;
  }
}
