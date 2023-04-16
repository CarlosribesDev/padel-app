import {  Component,  EventEmitter, OnInit, Output } from '@angular/core';

interface WeekDayy {
  text: string,
  value: number
}

@Component({
  selector: 'app-booking-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class BookingPickerComponent  implements OnInit{

  @Output() selectedDayEvent: EventEmitter<Date> = new EventEmitter();

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

  private currentMonth: number = this.currentDate.getMonth();
  private currentYear: number = this.currentDate.getFullYear();
  private currentDay: number = this.currentDate.getDate();
  today: Date = new Date();
  selectedDay: Date = new Date();

  month: string = this.monthNames[this.currentMonth];
  year :string = this.currentYear.toString()
  days: Date[] = []
  validDays: Date[] = [];
  prevDays: null[] = []

  constructor() {

  }

  ngOnInit(): void {
    this.today.setHours(0,0,0,0);
    this.writeMonth();
  }

  lastMonth(): void {
    if(this.currentMonth !== 0){
      this.currentMonth--;
    }else{
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.setNewDate();
  }

  nextMonth(): void {
    if(this.currentMonth !== 11){
        this.currentMonth++;
    }else{
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.setNewDate();
  }

  setNewDate(): void {
    this.days = []
    this.prevDays = []
    this.currentDate.setFullYear(this.currentYear,this.currentMonth,this.currentDay);
    this.month = this.monthNames[this.currentMonth];
    this.year = this.currentYear.toString();

    this.writeMonth();
  }

  selectDay(day: Date){
    this.selectedDay = day
    this.selectedDayEvent.emit(day);
  }



  getDaysFromMonth(): Date[]{
    const days: Date[] = [];
      const date = new Date(this.currentYear, this.currentMonth, 1);

      while (date.getMonth() === this.currentMonth) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }

      return days;
  }

  writeMonth() {
    this.prevDays = []
    this.days = []

    for(let i = this.startDay(); i > 0 ; i--) {
      this.prevDays.push(null);
    }

    this.days.push(...this.getDaysFromMonth());
    this.validDays = this.days.filter(day => day >= this.today && day < this.getNextWeekDate(this.today))
    this.selectedDay = this.validDays[0];
  }

  getNextWeekDate(date: Date): Date {
    const nextWeek = new Date(date);
    nextWeek.setDate(date.getDate() + 7);
    return nextWeek;
  }

  startDay(): number{
      const start = new Date(this.currentYear, this.currentMonth, 1);
      return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
  }

  onCurrentMonth(): boolean{
      return new Date().getMonth() === this.currentMonth;
  }

  onOneMonthAftherCurrent(): boolean {
    let value:number = new Date().getMonth();

    value !== 11 ? value ++ : value = 0;

    return (this.currentMonth) === value;
  }
}
