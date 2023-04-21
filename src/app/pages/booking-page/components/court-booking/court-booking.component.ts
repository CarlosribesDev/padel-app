import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Court } from 'app/models/Court';
import { CourtType } from 'app/models/CourtType';
import { Booking } from 'app/models/Booking';
import { BookingModalComponent } from 'app/shared/modals/booking-modal/booking-modal.component';

@Component({
  selector: 'app-court-booking',
  templateUrl: './court-booking.component.html',
  styleUrls: ['./court-booking.component.css']
})
export class CourtBookingComponent implements OnInit {

  imageSrc:String = '';

  @Input()court: Court = new Court();
  @Input()bookings: Booking[] = [];
  @Output()fecthDataEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    switch(this.court.type){
      case CourtType.OPEN: this.imageSrc = '../../../../assets/court-open.jpg'; break;
      case CourtType.INDOOR: this.imageSrc = '../../../../assets/court-indoor.jpg'; break;
      default : this.imageSrc = '../../../../assets/image.jpg'
    }
  }

  openBookingModal(booking: Booking) {

    const options = {
      size: 'sm',
    };

    const modal = this.modalService.open(BookingModalComponent, options);

    modal.componentInstance.booking = booking;
    modal.hidden.subscribe({
      next:() => {
        console.log("chapao");

      }
    })
  }

}
