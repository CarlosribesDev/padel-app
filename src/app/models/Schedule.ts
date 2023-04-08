export  class Schedule {
    id: number;
    name: string;
    hours: string[];

    constructor(json: any = {}){
      this.id = json.id;
      this.name = json.name;
      this.hours = json.hours;
    }
}
