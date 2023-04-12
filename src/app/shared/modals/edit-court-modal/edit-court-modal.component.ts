import { UserService } from '../../../service/user.service';

import { AuthService } from '../../../service/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from 'app/models/Schedule';
import Swal from 'sweetalert2';
import { CourtService } from 'app/service/court.service ';
import { Court } from 'app/models/Court';
import { CourtType } from 'app/models/CourtType';
import { ScheduleService } from 'app/service/schedule.service';

@Component({
  selector: 'app-edit-court-modal',
  templateUrl: './edit-court-modal.component.html',
})
export class EditCourtModalComponent implements OnInit {

  courtForm!: FormGroup;
  court!: Court;
  types: CourtType[] = Object.values(CourtType);
  schedules: Schedule[] = [];

  submit: boolean = false;

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private courtService: CourtService,
    private scheduleService: ScheduleService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,

    ) {

      this.courtForm = this.fb.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        schedule: ['', [Validators.required]]
      })
    }

  get name(): FormControl  { return this.courtForm.get('name') as FormControl }
  get price(): FormControl  { return this.courtForm.get('price') as FormControl }
  get schedule(): FormControl  { return this.courtForm.get('schedule') as FormControl }

  ngOnInit(): void {








    this.courtForm = this.fb.group({
      name: [this.court.name, [Validators.required]],
      price: [this.court.price, [Validators.required]],
      schedule: [this.court.schedule, [Validators.required]]
    })

    this.scheduleService.findAll().subscribe({
      next: schedules => {
        this.schedules = schedules;

      }
    })
  }

  close(){
    this.modalRef.close();
  }

  onSubmit(): void {

    this.court.name = this.name.value;
    this.court.price = this.price.value,
    this.court.schedule = this.schedule.value as Schedule

    this.courtService.update(this.court.id ,this.court).subscribe({
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




  }
}
