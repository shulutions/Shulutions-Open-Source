import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthentificationService, User } from 'src/app/services/authentification-service/authentification.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {

  updateUserForm: FormGroup = new FormGroup({
    id: new FormControl({value: null, disabled: true}, [Validators.required]),
    name: new FormControl(null, [
      Validators.required
    ]),
    username: new FormControl(null, [
      Validators.required,
    ])
  })

  constructor(
    private authService: AuthentificationService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let id: number = this.authService.getUserId();
    if( id !== -1) {
      this.userService.findOne(id).pipe(
        tap((user: User) => {
          this.updateUserForm.patchValue({
            id: user.id,
            name: user.name,
            username: user.username
          })
        })
      ).subscribe();
    }
    
  }

  update() {
    this.userService.updateOne(this.updateUserForm.getRawValue()).subscribe();
  }

}
