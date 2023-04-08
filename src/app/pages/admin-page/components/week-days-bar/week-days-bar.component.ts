import { WeekDay } from './../../../../models/WeekDay';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-week-days-bar',
  templateUrl: './week-days-bar.component.html',
})
export class WeekDaysBarComponent implements OnInit {

  @Output() daysSelectedEvent: EventEmitter<number[]> = new EventEmitter();

  days: WeekDay[] = [
    {
      name:'Lunes',
      selected: false,
      value:1
    },
    {
      name:'Martes',
      selected: false,
      value:2
    },
    {
      name:'Miercoles',
      selected: false,
      value:3
    },
    {
      name:'Jueves',
      selected: false,
      value:4
    },
    {
      name:'Viernes',
      selected: false,
      value:5
    },
    {
      name:'Sábado',
      selected: false,
      value:6,
    },
    {
      name:'Domingo',
      selected: false,
      value:0,
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  selectDay(day: WeekDay){
    day.selected = !day.selected;
    const daysSelected: number[] = this.days.filter(day => day.selected).map(day => day.value);
    this.daysSelectedEvent.emit(daysSelected);

  }
}


