import { UserBookingRequest } from "../models/request/UserBookingRequest";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/Booking';




@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private readonly rootURL: string = 'api/booking';

    constructor(private http: HttpClient){}

    setUserToBooking(id: number, userBookingRequest: UserBookingRequest): Observable<Booking> {
      return this.http.put<Booking>(`${this.rootURL}/${id}`, userBookingRequest);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.rootURL}/${id}`);
    }

    getById(id: number): Observable<Booking>{
      return this.http.get<Booking>(`${this.rootURL}/${id}`);
    }

    getAll(): Observable<Booking[]>{
      return this.http.get<Booking[]>(`${this.rootURL}`);
    }
}
