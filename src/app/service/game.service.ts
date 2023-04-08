import { Game } from './../models/Game';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GameService {

    private readonly rootURL: string = 'api/game';

    constructor(private http: HttpClient){}

    getById(id: number): Observable<Game>{
      return this.http.get<Game>(`${this.rootURL}/${id}`);
    }

    getAll(): Observable<Game[]>{
      return this.http.get<Game[]>(`${this.rootURL}`);
    }
}
