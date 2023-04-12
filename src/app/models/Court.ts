import { Schedule } from "./Schedule";
import { CourtType } from "./CourtType";

export class Court {
  id: number;
  name: string;
  type: CourtType;
  price: number;
  schedule: Schedule = new Schedule();

  constructor(json: any = {}){
    this.id = json.id;
    this.name = json.name;
    this.type = json.type;
    this.price = json.price;
    this.schedule = json.schedule;
  }
}
