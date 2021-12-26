import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification-service/authentification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthentificationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

}
