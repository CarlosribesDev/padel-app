import { NewUserRequest } from 'app/models/request/NewUserRequest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User} from 'app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly rootURL: string = `api/user`;

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<User>{
    return this.http.get<User>(`${this.rootURL}/${id}`);
  }

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

  saveUser(newUserRequest: NewUserRequest): Observable<User> {
    return this.http.post<User>(this.rootURL, newUserRequest);
  }

  getLoggedUser(): Observable<User | null> {
    const username = this.getUsername();
    return this.findAll({ usernames: [username]} ).pipe(map(users => users.length ? users[0] : null));
  }

  private getUsername(): string {
    return localStorage.getItem('username') || '';
  }

}
