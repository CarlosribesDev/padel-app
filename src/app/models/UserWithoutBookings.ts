export class UserWithoutBookings {
  id: number;
  name: string;
  surname: string;
  email: string;
  telephone: string;

  constructor(json: any = {}){
    this.id = json.id,
    this.name = json.name,
    this.surname = json.surname,
    this.email = json.email,
    this.telephone = json.telephone
  }
}
