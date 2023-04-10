import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenResponse } from '../../../models/request/TokenReponse';
import { LoginRequest } from '../../../models/request/LoginRequest';
import { AuthService } from './../../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

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

  async onSubmit() {

    this.submit = true;

    if(this.loginForm.status !== 'VALID') return;

    const loginRequest: LoginRequest = {
      username: this.username.value,
      password: this.password.value
    }

    this.authService.authUser(loginRequest).subscribe({
      next: async (tokenResp: TokenResponse) => {
        this.authService.logIn(tokenResp);


        const role = await firstValueFrom(this.authService.getRole());
        if(role === 'ADMIN') {
          this.router.navigate(['/admin']);
        }
        this.modalRef.close();
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
