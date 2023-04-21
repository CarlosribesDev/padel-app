import { UserBookingRequest } from './../../../models/request/UserBookingRequest';
import { BookingService } from './../../../service/booking.service';
import { Booking } from './../../../models/Booking';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenResponse } from '../../../models/request/TokenReponse';
import { LoginRequest } from '../../../models/request/LoginRequest';
import { AuthService } from '../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/service/user.service';
import { User } from 'app/models/User';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
})
export class BookingModalComponent implements OnInit {

  loginForm!: FormGroup;
  submit: boolean = false;

  booking: Booking = new Booking();

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService,
    ) {

      this.loginForm = fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
      })
    }

  get username(): FormControl  { return this.loginForm.get('username') as FormControl }
  get password(): FormControl  { return this.loginForm.get('password') as FormControl }

  ngOnInit(): void {

  }

  close(){
    console.log("cerrando");

    this.modalRef.close();
  }

  onSubmit(): void {

    const user: User | null = this.authService.getUser();
    const game: any | undefined = this.booking;

    if(user === null || game === undefined || this.booking.id === undefined){
      return;
    }

    const request: UserBookingRequest = {
        userId: user.id,
        gameId: game.id
    }

    this.bookingService.setUserToBooking(this.booking.id, request).subscribe({
      next: (booking:Booking)=> {
        this.booking = booking;
        Swal.fire({
          text: 'Reserva realizada',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })

      }
    })



    this.modalRef.close();

  }
}
