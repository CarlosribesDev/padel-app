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
import { Subject, zip } from 'rxjs';
import { CourtService } from 'app/service/court.service ';
import { Court } from 'app/models/Court';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit {

  schedules : Schedule[] = [];
  selectedSchedule: Schedule | null =  null;
  weekDaysSelected: number[] = [];

  sessionsSelected: Date [] = [];
  courts: Court[] = [];



  resetEvent: Subject<void> = new Subject<void>();

  constructor(
    private authService:AuthService,
    private modalService: NgbModal,
    private scheduleService:ScheduleService,
    private courtService: CourtService,
    private cdr: ChangeDetectorRef) {
     }

  ngOnInit(): void {
    this.fecthData();
  }

  fecthData(): void{
    zip(
      this.scheduleService.findAll(),
      this.courtService.findAll()
    ).subscribe(([schedules, courts])=> {
      this.schedules = schedules;
      this.courts = courts;
      this.cdr.detectChanges();
    })
  }

  selectSchedule(schedule: Schedule): void{
    this.selectedSchedule = schedule;
    this.sessionsSelected = schedule.hours.map(hour => new Date(`1970-01-01T${hour}Z`));
  }

  deleteSchedule() {

      if(this.selectedSchedule === null) return

      this.scheduleService.delete(this.selectedSchedule.id).subscribe({
        next:()=>{
          this.fecthData();
          this.selectedSchedule = null;
        }
      })
  }

  updateWeekDaysSelected(daysList: number[]){
    this.weekDaysSelected = daysList;
  }

  openScheduleModal(){
    this.modalService.open(ScheduleModalComponent ,{size: 'sm'}).hidden.subscribe({
      next:() => {
        this.fecthData();
      }
    })
  }

}
