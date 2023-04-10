import { UserService } from '../../service/user.service';
import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'app/models/User';

export class FormValidators  {

  constructor(){

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


  static usernameExist(userService: UserService): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const username: string = control.value;

      const value = await firstValueFrom(userService.findAll({ username: username }));

      return value.length ?  { usernameAlreadyExists: true } : null;
    }
  }
}
