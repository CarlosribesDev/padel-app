import { Router } from '@angular/router';
import { User } from 'app/models/User';
import { TokenResponse } from '../models/request/TokenReponse';
import { Observable, Subject } from 'rxjs';
import { LoginRequest } from '../models/request/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUserRequest } from 'app/models/request/NewUserRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly rootURL: string = `api/auth`;
  loginStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private http:HttpClient, private router: Router) { }


  register(newUserRequest: NewUserRequest) {
    return this.http.post<TokenResponse>(`${this.rootURL}/register`, newUserRequest)
  }

  authUser(loginRequest: LoginRequest): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.rootURL}/authenticate`, loginRequest)
  }

  logIn(tokenReponse: TokenResponse): void{
      localStorage.setItem('token', tokenReponse.token);
      localStorage.setItem('username', tokenReponse.username);
  }

  isLogged(): boolean {
    const token: string | null = localStorage.getItem('token');

    return !token ? false : true;
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.loginStatus.next(false);
    this.router.navigate(['']);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getRole() {
    const username = localStorage.getItem('username');
    return this.http.get<string>(`${this.rootURL}/${username}`);
  }






  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.rootURL}/current-user`)
  }
}
