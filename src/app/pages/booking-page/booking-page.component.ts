import { Booking } from './../../models/Booking';
import { AuthService } from './../../service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingModalComponent } from 'app/shared/modals/booking-modal/booking-modal.component';
import { BookingService } from 'app/service/booking.service';
import { CourtService } from 'app/service/court.service ';
import { Court } from 'app/models/Court';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  selectedDay: Date = new Date();
  courts: Court[] = [];
  isLooged: boolean = false;
  bookings: Booking[] = [];
  courtBookings = new Map<number, Booking[]>();

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private modalService: NgbModal,
    private bookingSerive: BookingService,
    private courtService: CourtService,
    private router: Router) {

   }



  ngOnInit(): void {
    this.courtService.findAll().subscribe({
      next: (courts) => {
          this.courts = courts;
      }
    });
  }

  selectDay(day: Date){
    this.selectedDay = day;
    this.bookingSerive.findAll({inDate: this.formateDate(day)}).subscribe({
      next: (bookings) => {
        this.courtBookings.clear();
        bookings.forEach(booking => {
          const courtId = booking.court.id;

          if (!this.courtBookings.has(courtId)) {
            this.courtBookings.set(courtId, []);
          }

          this.courtBookings.get(courtId)?.push(booking);
        });
      }
    })
  }

  formateDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`
  }

  openConfirmModal(booking: Booking){
    const modalRef = this.modalService.open(BookingModalComponent,{size: 'sm'});
    modalRef.componentInstance.booking = booking;
  }
}
