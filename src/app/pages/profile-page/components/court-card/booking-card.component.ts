import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourtType } from 'app/models/CourtType';
import { Booking } from 'app/models/Booking';
import { User } from 'app/models/User';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css']
})
export class BookingCardComponent implements OnInit {
  @Input()booking: Booking = new Booking();
  @Output()fecthDataEvent: EventEmitter<void> = new EventEmitter();

  imageSrc:String = '';
  user = new User();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.setCourtImage();
    this.setUser();
  }

  setCourtImage() {
    switch(this.booking.court.type){
      case CourtType.OPEN: this.imageSrc = '../../../../assets/court-open.jpg'; break;
      case CourtType.INDOOR: this.imageSrc = '../../../../assets/court-indoor.jpg'; break;
      default : this.imageSrc = '../../../../assets/image.jpg'
    }
  }

  setUser() {
      this.userService.findById(this.booking.userId).subscribe({
        next: (user)=> this.user = user
      })
  }

  deleteBooking() {

    console.log('borrar')
  }

}
