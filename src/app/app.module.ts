import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { GameCardComponent } from './pages/main-page/components/game-card/game-card.component';
import { BookingPickerComponent } from './pages/booking-page/booking-picker/booking-picker.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { authInterceptorProviders } from './service/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRotingModule } from './app-roting.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { CourtCardComponent } from './pages/admin-page/components/court-card/court-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    AdminPageComponent,
    BookingPageComponent,
    BookingPickerComponent,
    BookingPickerComponent,
    GameCardComponent,
    ProfilePageComponent,
    CourtCardComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRotingModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    TooltipModule.forRoot()

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
