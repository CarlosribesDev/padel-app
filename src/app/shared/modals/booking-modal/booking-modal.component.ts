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
import { mergeMap } from 'rxjs';


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
    private authService: AuthService,
    private bookingService: BookingService,
    private userService: UserService
    ) {


    }

  ngOnInit(): void {

  }

  close(){
    console.log("cerrando");

    this.modalRef.close();
  }

  onSubmit(): void {

    const username = this.authService.getUsername();
    console.log(this.booking);

    this.userService.findAll({ usernames: [username]}).pipe(
      mergeMap((user) => {
        this.booking.userId = user[0].id;
        return this.bookingService.update(this.booking, this.booking.id);
      })
    ).subscribe({
      next: ()=> {
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
