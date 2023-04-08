export class Game {
  id:number;
  duration: number ;
  name: string;
  title: string;
  description: string ;
  price: number;

  constructor(json: any = {}){
    this.id = json.id;
    this.name = json.name;
    this.duration = json.duration;
    this.title = json.title;
    this.description = json.description;
    this.price = json.price;
  }
}
