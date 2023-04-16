import { User } from "./User";
import { Court } from "./Court";

export class Booking {
  id: number ;
  court: Court;
  date: Date;
  user: User;

  constructor(json: any = {}){
    this.id = json.id;
    this.court = json.court;
    this.date = json.date;
    this.user = json.user;
  }
}
