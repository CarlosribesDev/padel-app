import { NewUserRequest } from 'app/models/request/NewUserRequest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User} from 'app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly rootURL: string = `api/user`;

  constructor(private http: HttpClient) { }

  findAll(params?: any): Observable<User[]> {
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

    return this.http.get<User[]>(this.rootURL, options);
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getLoggedUser(): Observable<User | null> {
    const username = this.getUsername();
    return this.findAll({ usernames: [username]} ).pipe(map(users => users.length ? users[0] : null));
  }

  findById(id: number): Observable<User>{
    return this.http.get<User>(`${this.rootURL}/${id}`);
  }

  saveUser(newUserRequest: NewUserRequest): Observable<User> {
    return this.http.post<User>(this.rootURL, newUserRequest);
  }
}
