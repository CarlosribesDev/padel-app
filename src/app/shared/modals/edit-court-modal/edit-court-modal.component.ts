import { UserService } from '../../../service/user.service';

import { AuthService } from '../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from 'app/models/Schedule';
import Swal from 'sweetalert2';
import { CourtService } from 'app/service/court.service ';
import { Court } from 'app/models/Court';

@Component({
  selector: 'app-edit-court-modal',
  templateUrl: './edit-court-modal.component.html',
})
export class EditCourtModalComponent implements OnInit {

  courtForm!: FormGroup;
  court!: Court;

  submit: boolean = false;

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private courtService: CourtService,
    private userService: UserService
    ) {


    }

  get name(): FormControl  { return this.courtForm.get('name') as FormControl }
  get type(): FormControl  { return this.courtForm.get('type') as FormControl }
  get schedule(): FormControl  { return this.courtForm.get('schedule') as FormControl }

  ngOnInit(): void {
    this.courtForm = this.fb.group({
      name: [this.court.name, [Validators.required]],
      type: [this.court.type, [Validators.required]],
      schedule: [this.court.schedule, [Validators.required]]
    })
  }

  close(){
    this.modalRef.close();
  }

  onSubmit(): void {

    const court =  new Court({
      name: this.name.value,
      type: this.type,
      schedule: this.schedule.value as Schedule
    })

    this.courtService.update(court.id ,court).subscribe({
      next:(court: Court)=>{
        Swal.fire({
          text: 'Pista actualizada',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.modalRef.close();

      }
    })

   
    this.courtForm.reset();
  }

  AddHour(): void {
    const newHour = this.type.value;



  }
}
