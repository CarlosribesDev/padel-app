import { UserService } from '../../../service/user.service';
import { NewUserRequest } from 'src/app/models/request/NewUserRequest';
import { User } from 'src/app/models/User';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidators } from 'src/app/shared/utils/form-validators';

import Swal from 'sweetalert2';


@Component({

  templateUrl: './registration-modal.component.html',
})
export class RegistrationModalComponent implements OnInit {

  userForm!: FormGroup;
  errorMessage: string = '';
  submit: boolean = false;

  constructor(
    public modalRef: NgbActiveModal,
    fb: FormBuilder,
    private userService: UserService,
    ) {

    this.userForm = fb.group({
      name : [null, [Validators.required, Validators.minLength(3)]],
      surname: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)], [FormValidators.usernameExist(userService)]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      passwordRepeated: [null, [Validators.required]],
      telephone: [null, [Validators.required, FormValidators.phoneNumberValidator()], [FormValidators.telephoneExist(userService)]],
      email: [null, [Validators.required, FormValidators.emailValidator()], [FormValidators.emailExist(userService)]],
    })
  }

  get name(): FormControl { return this.userForm.get('name') as FormControl }
  get surname(): FormControl  { return this.userForm.get('surname') as FormControl }
  get username(): FormControl  { return this.userForm.get('username') as FormControl }
  get password(): FormControl  { return this.userForm.get('password') as FormControl }
  get passwordRepeated(): FormControl { return this.userForm.get('passwordRepeated') as FormControl }
  get telephone(): FormControl { return this.userForm.get('telephone') as FormControl }
  get email(): FormControl  { return this.userForm.get('email') as FormControl }

  ngOnInit(): void {
    this.passwordRepeated.addValidators(FormValidators.passwordMatch(this.password));
  }

  onSubmit(): void {
    this.submit = true;

    if(this.userForm.status !== 'VALID') return;

    const user: NewUserRequest = {
      name: this.name.value,
      surname: this.surname.value,
      username: this.username.value,
      password: this.password.value,
      telephone: this.telephone.value,
      email: this.email.value
    }

    this.userService.saveUser(user).pipe(take(1)).subscribe({
      next: (user: User) => {
        this.modalRef.close()

        Swal.fire({
          text: 'Usuario registrado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })

      },
      error: (error) => {
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
