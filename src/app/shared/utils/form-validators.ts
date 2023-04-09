import { UserService } from '../../service/user.service';
import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class FormValidators  {

  constructor(){

  }

  static phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const error: Object = { correctNumber: true }

      const numDigitPattern: RegExp = /^[0-9]{9}$/;

      return numDigitPattern.test(value) ? null : error;
    }
  }

  static passwordMatch(passwordFormControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: Object = { passwordConfirmed: true }
      const value: string = control.value;

      const password: string = passwordFormControl.value;

      return value === password ? null : error;
    }
  }

  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value: string = control.value;
      const error: Object = { invalidEmail : true }

      const emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

      return emailPattern.test(value) ?  null : error;
    }
  }

  static emailExist(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email: string = control.value;

      return userService.emailExist(email)
      .pipe(
        map((exist: boolean) =>
          exist ? { emailAlreadyExists: true } : null
        )
      );
    }
  }

  static usernameExist(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username: string = control.value;

      return userService.usernameExist(username)
      .pipe(
        map((exist: boolean) =>
          exist ? { usernameAlreadyExists: true } : null
        )
      );
    }
  }
}
