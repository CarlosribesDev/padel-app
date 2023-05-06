import { UserBookingRequest } from "../models/request/UserBookingRequest";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/Booking';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

  private readonly rootURL: string = 'api/booking';

  constructor(private http: HttpClient){}

  findAll(params?: any): Observable<Booking[]> {
    let httpParams = new HttpParams();
    if(params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    const options = {
      headers:  { 'Content-Type': 'application/json' },
      params: httpParams
    };

    return this.http.get<Booking[]>(this.rootURL, options);
  }

  update(booking: Booking, id: number): Observable<Booking> {
    return this.http.put<Booking>(`${this.rootURL}/${id}`, booking);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.rootURL}/${id}`);
  }
}
