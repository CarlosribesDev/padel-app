import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Schedule } from '../models/Schedule';




@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    private readonly rootURL: string = `api/schedule`;

    constructor(private http: HttpClient){}

    save(schdule: Schedule): Observable<Schedule> {
        return this.http.post<Schedule>(this.rootURL, schdule);
      }

    get(id: number): Observable<Schedule> {
        return this.http.get<Schedule>(`${this.rootURL}/${id}`);
    }

    findAll(): Observable<Schedule[]> {
        return this.http.get<Schedule[]>(`${this.rootURL}`);
    }

    delete(id:number): Observable<void> {
        return this.http.delete<void>(`${this.rootURL}/${id}`)
    }
}
