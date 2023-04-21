import { UserService } from '../../../service/user.service';
import { NewUserRequest } from 'app/models/request/NewUserRequest';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { first, firstValueFrom, take, map } from 'rxjs';
import { FormValidators } from 'app/shared/utils/form-validators';

import Swal from 'sweetalert2';
import { AuthService } from 'app/service/auth.service';


@Component({

  templateUrl: './registration-modal.component.html',
})
export class RegistrationModalComponent implements OnInit {

  registrationForm!: FormGroup;
  errorMessage: string = '';
  submit: boolean = false;
  formEmpty = true;
  usernameExist = true;

  constructor(
    public modalRef: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private authService :AuthService
    ) {

    this.registrationForm = fb.group({
      name : [''],
      surname: [''],
      username: [''],
      password: [''],
      passwordRepeated: [''],
      email: ['', [FormValidators.emailValidator()]],
    })
  }

  get name(): FormControl { return this.registrationForm.get('name') as FormControl }
  get surname(): FormControl  { return this.registrationForm.get('surname') as FormControl }
  get username(): FormControl  { return this.registrationForm.get('username') as FormControl }
  get password(): FormControl  { return this.registrationForm.get('password') as FormControl }
  get passwordRepeated(): FormControl { return this.registrationForm.get('passwordRepeated') as FormControl }
  get email(): FormControl  { return this.registrationForm.get('email') as FormControl }

  ngOnInit(): void {
    this.passwordRepeated.addValidators(FormValidators.passwordMatch(this.password));
    this.registrationForm.valueChanges.subscribe(()=> {
      this.formEmpty = Object.values(this.registrationForm.getRawValue()).some(value => value === '')
    });
  }

  checkUsernameExist(): Promise<boolean>{
    return firstValueFrom(this.userService.findAll({ usernames: this.username.value })
    .pipe(first(), map(users =>  users.length > 0)))
  }

  async onSubmit() {
    this.submit = true;
    this.usernameExist = await this.checkUsernameExist();

    if(this.registrationForm.status !== 'VALID' || this.usernameExist) return;

    const user: NewUserRequest = {
      name: this.name.value,
      surname: this.surname.value,
      username: this.username.value,
      password: this.password.value,
      email: this.email.value
    }

    this.authService.register(user).pipe(take(1)).subscribe({
      next: () => {
        this.modalRef.close()

        Swal.fire({
          text: 'Usuario registrado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      },
      error: () => {
          this.modalRef.close()
          Swal.fire({
            text: 'Error al registrar usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }

    })
  }
}
