import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { ScheduleModalComponent } from './schedule-modal/schedule-modal.component';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { RegistrationModalComponent } from "./registration-modal/registration-modal.component";
import { CommonModule } from '@angular/common';
import { ValidatorErrorsComponent } from './validator-erros/validator-errors.component';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    LoginModalComponent,
    RegistrationModalComponent,
    ValidatorErrorsComponent,
    ScheduleModalComponent,
    BookingModalComponent

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
