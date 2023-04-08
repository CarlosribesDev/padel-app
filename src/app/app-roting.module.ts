import { UserGuard } from './service/user.guard';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { AdminGuard } from './service/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
 { path: '', component: MainPageComponent },
 { path: 'admin', component: AdminPageComponent, canActivate:[AdminGuard] },
 { path: 'contact', component: ContactPageComponent },
 { path: 'booking/:id', component: BookingPageComponent },
 { path: 'bookings', component: ProfilePageComponent, canActivate:[UserGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRotingModule { }
