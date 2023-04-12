import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { ScheduleModalComponent } from './schedule-modal/schedule-modal.component';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginModalComponent } from "./login-modal/login-modal.component";
import { RegistrationModalComponent } from "./registration-modal/registration-modal.component";
import { EditCourtModalComponent } from './edit-court-modal/edit-court-modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginModalComponent,
    RegistrationModalComponent,
    ScheduleModalComponent,
    BookingModalComponent,
    EditCourtModalComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  exports:[
  ]
})
export class ModalsModule { }
