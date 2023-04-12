import { UserService } from '../../../service/user.service';

import { AuthService } from '../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from 'app/models/Schedule';
import Swal from 'sweetalert2';
import { ScheduleService } from 'app/service/schedule.service';

@Component({
  selector: 'app-edit-court-modal',
  templateUrl: './edit-court-modal.component.html',
})
export class EditCourtModalComponent implements OnInit {

  scheduleForm!: FormGroup;
  submit: boolean = false;
  hours: string[] = [];
  hourPicker: string = '';

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private userService: UserService
    ) {

      this.scheduleForm = fb.group({
        name: [null, [Validators.required]],
        hour: [null, [Validators.required]],
      })
    }

  get name(): FormControl  { return this.scheduleForm.get('name') as FormControl }
  get hour(): FormControl  { return this.scheduleForm.get('hour') as FormControl }

  ngOnInit(): void {

  }

  close(){
    this.modalRef.close();
  }

  onSubmit(): void {

    const schedule =  new Schedule({
      name: this.name.value,
      hours: this.hours
    })

    this.scheduleService.save(schedule).subscribe({
      next:(schedule: Schedule)=>{
        Swal.fire({
          text: 'Horario creado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.modalRef.close();

      }
    })

    this.hours = []
    this.scheduleForm.reset();
  }

  AddHour(): void {
    const newHour = this.hour.value;

    this.hours.push(newHour);

  }
}
