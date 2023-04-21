import { BookingService } from './../../../service/booking.service';
import { Booking } from './../../../models/Booking';
import { AuthService } from '../../../service/auth.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/service/user.service';
import Swal from 'sweetalert2';
import { mergeMap } from 'rxjs';


@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
})
export class BookingModalComponent {

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

  close(){
    this.modalRef.close();
  }

  onSubmit(): void {
    const username = this.authService.getUsername();

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

    this.close();
  }
}
