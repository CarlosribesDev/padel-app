import { BookingService } from './../../service/booking.service';
import { UserService } from './../../service/user.service';
import { Booking } from './../../models/Booking';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  role: string = '';
  isAdmin = false;
  isLogged = false;
  bookings: Booking[] = [];
  user: User = new User();

  constructor(private authService: AuthService,
              private userService: UserService,
              private bookignService: BookingService) { }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    this.isLogged = this.authService.isLogged();
    this.authService.isAdmin().subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    })
    this.userService.getLoggedUser().subscribe({
      next: (user) => {
        if(user) {
          this.user = user;
          this.loadBookings();
        }
      }
    })
  }

  loadBookings() {
    this.bookings = []

    if(!this.isLogged) {
      return;
    }

    if(this.isAdmin){
      this.userService.findAll().subscribe({
        next:(users: User[])=>{
          this.bookings = users.reduce((acum, user) => acum.concat(user.bookings || []), new Array<Booking>());
        }
      })
    }
    else {
      this.userService.findById(this.user.id).subscribe({
        next:(user: User)=> {
          this.bookings = user.bookings.sort((a,b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
        }
      })
    }
  }

  isToday(bookingDate: Date):boolean {
    const today = new Date()
    const date = new Date(bookingDate);

    return date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
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

