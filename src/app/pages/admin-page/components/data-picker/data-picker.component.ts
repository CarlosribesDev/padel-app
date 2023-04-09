import { Observable, Subscription } from 'rxjs';
import { WeekDay } from './../../../../models/WeekDay';
import { Day } from './../../../../models/Day';
import {  Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import { DayService } from 'app/service/day.service';

interface WeekDayy {
  text: string,
  value: number
}

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.css']
})
export class DataPickerComponent  implements OnInit{

  @Output() selectedDaysEvent: EventEmitter<Day[]> = new EventEmitter();
  @Output() focusDayEvent: EventEmitter<Day> = new EventEmitter();

  @Input() resetEvent: Observable<void> = new Observable<void>;

  readonly monthNames: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
  readonly weekDays: WeekDayy[] = [
    {
      text:'Lu',
      value:1
    },
    {
      text:'Ma',
      value:2
    },
    {
      text:'Mi',
      value:3
    },
    {
      text:'Ju',
      value:4
    },
    {
      text:'Vi',
      value:5
    },
    {
      text:'Sa',
      value:6
    },
    {
      text:'Do',
      value:0
    },
  ]
  private currentDate = new Date();

  private monthNumber: number = this.currentDate.getMonth();
  private currentYear: number = this.currentDate.getFullYear();
  private currentDay: number = this.currentDate.getDate();
  selectedDays: Day[] = []

  month: string = this.monthNames[this.monthNumber];
  year :string = this.currentYear.toString()
  days: Day[]= []
  prevDays: null[] = []

  constructor(private dayService: DayService) {

  }

  ngOnInit(): void {
    this.writeMonth();
    this.resetEvent.subscribe({
      next:()=>{
        this.selectedDays = []
        this.selectedDaysEvent.emit(this.selectedDays);

      }
    })
  }

  lastMonth(): void {
    if(this.monthNumber !== 0){
      this.monthNumber--;
    }else{
      this.monthNumber = 11;
      this.currentYear--;
    }
    this.setNewDate();
  }

  nextMonth(): void {
    if(this.monthNumber !== 11){
        this.monthNumber++;
    }else{
      this.monthNumber = 0;
      this.currentYear++;
    }
    this.setNewDate();
  }

  setNewDate(): void {
    this.days = []
    this.prevDays = []
    this.currentDate.setFullYear(this.currentYear,this.monthNumber,this.currentDay);
    this.month = this.monthNames[this.monthNumber];
    this.year = this.currentYear.toString();

    this.writeMonth();
  }

  selectDay(day: Day){
    if(this.selectedDays.includes(day)){
      this.selectedDays = this.selectedDays.filter(d => d !== day)
    }
    else{
      this.selectedDays.push(day)
    }

    this.selectedDaysEvent.emit(this.selectedDays);
  }

  selectWeekDay(num: number): void{

    const daysInWeekDay: Day[] = this.days.filter(d => new Date(d.date).getDay() === num)

    daysInWeekDay.forEach(day => {
      if(!this.selectedDays.includes(day)){
        this.selectedDays.push(day)
      }
    })

    this.selectedDaysEvent.emit(this.selectedDays);
  }

  writeMonth() {
    for(let i = this.startDay(); i > 0 ; i--){
      this.prevDays.push(null);
    }

    this.dayService.findByDate(this.currentYear, this.monthNumber + 1).subscribe({
      next:(daysInMonth: Day[]) => {
        this.days.push(...daysInMonth);
      }
    })
  }

  startDay(): number{
      const start = new Date(this.currentYear, this.monthNumber, 1);
      return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
  }

  showDay(day: Day): void {
      this.focusDayEvent.emit(day);
  }

  onCurrentMonth(): boolean{
      return new Date().getMonth() === this.monthNumber;
  }

  onThreeMonthAftherCurrent(): boolean {
    let value:number = new Date().getMonth();

    for (let index = 1; index <= 3; index++) {
      value !== 11 ? value ++ : value = 0;
    }
    return (this.monthNumber) === value;
  }
}
