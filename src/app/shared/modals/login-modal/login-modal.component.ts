import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenResponse } from '../../../models/request/TokenReponse';
import { LoginRequest } from '../../../models/request/LoginRequest';
import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/service/user.service';
import { User } from 'app/models/User';
import { ThisReceiver } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent implements OnInit {

  loginForm!: FormGroup;
  submit: boolean = false;

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) {

      this.loginForm = fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
      })
    }

  get username(): FormControl  { return this.loginForm.get('username') as FormControl }
  get password(): FormControl  { return this.loginForm.get('password') as FormControl }

  ngOnInit(): void {

  }

  close(){
    this.modalRef.close();
  }

  onSubmit(): void {

    this.submit = true;

    if(this.loginForm.status !== 'VALID') return;

    const loginRequest: LoginRequest = {
      username: this.username.value,
      password: this.password.value
    }

    this.authService.authUser(loginRequest).subscribe({
      next: (tokenResp: TokenResponse) => {
        this.authService.logIn(tokenResp.token);
        this.authService.getCurrentUser().subscribe({
          next:(user: User) => {
              this.authService.setUser(user);
              console.log("eee");

              this.authService.getUserRole().subscribe({
                next:(rolesponse )=>{
                  const role = rolesponse.role;
                  localStorage.setItem('role', role);

                  if(role === "ROLE_ADMIN"){
                    this.router.navigate(['/admin']);
                    this.authService.loginStatus.next(true);
                  }
                  else if(role === "ROLE_USER"){
                    this.router.navigate(['']);
                    this.authService.loginStatus.next(true);
                  }else{
                    console.log("out");
                    this.authService.logOut();
                  }
                  this.modalRef.close();
                },
                error:(ee)=>{
                  console.log("error");
                  console.log(ee);

                  this.authService.logOut();
                  this.modalRef.close();
                }
              })




          }
        })


      },
      error: (errorResponse: HttpErrorResponse) => {

        Swal.fire({
          text: 'Datos invalidos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })

      }
    })

  }
}
