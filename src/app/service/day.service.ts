import { Day } from './../models/Day';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DayService {

    private readonly rootURL: string = 'api/day';

    constructor(private http: HttpClient){}

    findByDate(year:number,month: number): Observable<Day[]> {
        return this.http.get<Day[]>(`${this.rootURL}/${year}/${month}`);
    }

    updateAll(days: Day[]): Observable<Day[]>{

        return this.http.put<Day[]>(`${this.rootURL}`, days);
    }
}
