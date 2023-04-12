import { Court } from '../models/Court';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CourtService {

    private readonly rootURL: string = 'api/court';

    constructor(private http: HttpClient){}

    findById(id: number): Observable<Court>{
      return this.http.get<Court>(`${this.rootURL}/${id}`);
    }

    findAll(): Observable<Court[]>{
      return this.http.get<Court[]>(`${this.rootURL}`);
    }
}
