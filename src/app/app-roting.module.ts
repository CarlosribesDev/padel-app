
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
 { path: '', component: MainPageComponent },
 { path: 'admin', component: AdminPageComponent, },
 { path: 'contact', component: ContactPageComponent },
 { path: 'profile', component: ProfilePageComponent },
 { path: 'bookings', component: BookingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRotingModule { }
