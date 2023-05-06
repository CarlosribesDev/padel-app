import { Router } from '@angular/router';
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
    private modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  get username(): FormControl  { return this.loginForm.get('username') as FormControl }
  get password(): FormControl  { return this.loginForm.get('password') as FormControl }

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

        const isAdmin = await firstValueFrom(this.authService.isAdmin());

        if(isAdmin) {
          this.router.navigate(['/admin']);
        }
        this.modalRef.close();
      },
      error: () => {
        Swal.fire({
          text: 'Datos invalidos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })

      }
    })

  }
}
