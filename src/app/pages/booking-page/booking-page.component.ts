import { Booking } from './../../models/Booking';
import { AuthService } from './../../service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingModalComponent } from 'app/shared/modals/booking-modal/booking-modal.component';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit,OnDestroy {


  private sub: any;
  selectedDay?: Date;

  bgClass: String = '';
  isLooged: boolean = false;
  updateCalendar: Subject<void> = new Subject<void>();


  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private modalService: NgbModal,
    private router: Router) {

   }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit(): void {

  }

  selectDay(day: Date){
    this.selectedDay = day;
  }

  openConfirmModal(booking: Booking){

   

    const modalRef = this.modalService.open(BookingModalComponent,{size: 'sm'});


    modalRef.componentInstance.booking = booking;
    modalRef.closed.subscribe({
      next:()=>{
          this.updateCalendar.next();
        }
    })
  }
}
