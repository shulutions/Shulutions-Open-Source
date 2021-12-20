import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification.service';

class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors | null {
    const regex = /\d/;
    if (regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return {passwordInvalid: true}
    }
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password')?.value;
      const passwordConfirm = control.get('passwordConfirm')?.value;

      if((password === passwordConfirm) && password !== null && passwordConfirm !== null) {
        return null;
      } else {
        return {passwordsNotMatching: true};
      }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(1), //make this bigger
        CustomValidators.passwordContainsNumber
      ]),
      passwordConfirm: new FormControl(null, [Validators.required])
    }, {
      validators: CustomValidators.passwordsMatch
    }
  )

  constructor(
    private authService: AuthentificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value)
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe()
  }

}
