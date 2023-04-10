import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { ScheduleModalComponent } from './schedule-modal/schedule-modal.component';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { RegistrationModalComponent } from "./registration-modal/registration-modal.component";
import { CommonModule } from '@angular/common';

import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { InputComponent } from './registration-modal/input/input.component';


@NgModule({
  declarations: [
    LoginModalComponent,
    RegistrationModalComponent,
    ScheduleModalComponent,
    BookingModalComponent,
    InputComponent

  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgxMaterialTimepickerModule
  ],
  exports:[
  ]
})
export class ModalsModule { }
