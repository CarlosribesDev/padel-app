import { BookingService } from './../../service/booking.service';
import { UserService } from './../../service/user.service';
import { Booking } from './../../models/Booking';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/User';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  role: string = '';
  bookings: Booking[] = [];
  user: User | null = null

  constructor(private authService: AuthService,
              private userService: UserService,
              private bookignService: BookingService) { }

  async ngOnInit() {

    // this.role = await firstValueFrom(this.authService.getRole());

    // this.loadBookings();

  }

  loadBookings() {
    this.bookings = []
    if(this.role === 'ROLE_ADMIN'){
      this.userService.findAll().subscribe({
        next:(users: User[])=>{
          console.log(users);

            users.forEach(user => {
              this.bookings = this.bookings.concat(user.bookings);
              console.log(this.bookings);

            })
        }
      })
    }
    else if(this.role === 'ROLE_USER'){
      const userId = this.authService.getUser()?.id;
      if(userId){
        this.userService.getUserById(userId).subscribe({
          next:(user: User)=> {
            this.bookings = user.bookings.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());


          }

        })
      }

    }
  }

  isToday(bookingDate: Date):boolean {
    const today = new Date()
    const date = new Date(bookingDate);

    return date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  }

  getImageSrc(booking: Booking): string{

    if(!booking.game){
      return '../../../../assets/image.jpg';
    }

    switch(booking.game.name){
      case  "THE_DEN": return'../../../../assets/the-den.jpg';
      case "HAUNTED_HOUSE" : return '../../../../assets/haunted-house.jpg'; break;
      default : return '../../../../assets/image.jpg'
    }
  }

  deleteBooking(id: number | undefined){
    if(id){
      this.bookignService.delete(id).subscribe({
        next:()=>{
          this.loadBookings();
        }
      })
    }
  }
}

