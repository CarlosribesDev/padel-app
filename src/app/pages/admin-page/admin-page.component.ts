import { Booking } from './../../models/Booking';
import { DayService } from './../../service/day.service';
import { ScheduleService } from 'app/service/schedule.service';
import { Schedule } from 'app/models/Schedule';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ScheduleModalComponent } from 'app/shared/modals/schedule-modal/schedule-modal.component';
import { ChangeDetectorRef } from '@angular/core';
import { Day } from 'app/models/Day';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {

  schedules : Schedule[] = [];
  selectedSchedule?: Schedule;
  weekDaysSelected: number[] = [];
  focusDay?: Day;
  daysSelected: Day[] = [];

  resetEvent: Subject<void> = new Subject<void>();

  constructor(
    private authService:AuthService,
    private modalService: NgbModal,
    private scheduleService:ScheduleService,
    private dayService: DayService,
    private cdr: ChangeDetectorRef) {
     }

  ngOnInit(): void {
    this.getSchedules();
  }

  getSchedules(): void{
    this.scheduleService.findAll().subscribe({
      next:(resp: Schedule[])=> {
        this.schedules = resp;
        this.cdr.detectChanges();
      }
    })
  }

  selectSchedule(schedule: Schedule): void{
    this.selectedSchedule = schedule;
  }

  deleteSchedule(schedule: Schedule){
      this.scheduleService.delete(schedule.id).subscribe({
        next:()=>{
          this.getSchedules();
          this.selectedSchedule = undefined;
        }
      })
  }

  updateWeekDaysSelected(daysList: number[]){
    this.weekDaysSelected = daysList;
  }

  setFocusDay(day: Day){
    this.focusDay = day;
  }

  updateCalendar(schedule: Schedule){

    this.daysSelected.forEach(day => {
      const bookings: Booking[] = schedule.hours.map(hour => {

        return new Booking({
          hour:hour,
          date:day.date,
          dayId:day.id,
          isBusy:false,
        })

      })

      day.bookings = bookings;
    })

    this.dayService.updateAll(this.daysSelected).subscribe({
      next:(days: Day[])=> {
        this.resetEvent.next();
        Swal.fire({
          text: 'Calendario Actualizado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      },
      error:(e)=>{
        console.log(e);

        Swal.fire({
          text: 'Error al actualizar horario',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })

      }
    })
  }
  onUpdateDays(days: Day[]){
    this.daysSelected = days;
  }
  openScheduleModal(){
    this.modalService.open(ScheduleModalComponent ,{size: 'sm'}).hidden.subscribe({
      next:()=>{
        this.getSchedules();
      }
    })
  }

}
