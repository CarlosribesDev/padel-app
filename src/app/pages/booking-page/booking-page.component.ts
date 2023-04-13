import { Booking } from './../../models/Booking';
import { AuthService } from './../../service/auth.service';
import { GameService } from './../../service/game.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from 'app/models/Day';
import { Game } from 'app/models/Game';
import { BookingModalComponent } from 'app/shared/modals/booking-modal/booking-modal.component';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit,OnDestroy {


  private sub: any;
  selectedDay?: Day;
  game: Game = new Game;
  bgClass: String = '';
  isLooged: boolean = false;
  updateCalendar: Subject<void> = new Subject<void>();


  constructor(
    private route: ActivatedRoute,
    private gameService:GameService,
    public authService: AuthService,
    private modalService: NgbModal,
    private router: Router) {

   }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit(): void {

  }

  selectDay(day: Day){
    this.selectedDay = day;
  }

  openConfirmModal(booking: Booking){

    booking.game = this.game;

    const modalRef = this.modalService.open(BookingModalComponent,{size: 'sm'});


    modalRef.componentInstance.booking = booking;
    modalRef.closed.subscribe({
      next:()=>{
          this.updateCalendar.next();
        }
    })
  }
}
