import { Court } from "./Court";

export class Booking {
  id: number;
  court: Court;
  dateTime: Date;
  userId: number;

  constructor(json: any = {}){
    this.id = json.id;
    this.court = json.court;
    this.dateTime = json.date;
    this.userId = json.userId;
  }
}
