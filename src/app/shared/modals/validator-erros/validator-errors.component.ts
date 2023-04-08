import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-validator-errors',
  templateUrl: './validator-errors.component.html',
})
export class ValidatorErrorsComponent implements OnInit {

  @Input() control!:  FormControl;
  @Input() submit!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
