import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification-service/authentification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(1) //make this bigger
    ])
  })
  
  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      map(token => {
        this.router.navigate(['/']),
        this.router.navigate([this.authService.redirectUrl || '/']),
        this.authService.redirectUrl = null; // Clear the stored URL
      })
    ).subscribe();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
