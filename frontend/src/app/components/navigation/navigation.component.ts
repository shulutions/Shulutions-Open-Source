import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification-service/authentification.service';

interface NavigationItem {
  text: string
  icon: string
  link: string
  exact?: boolean
  notifications?: { show: boolean, count?: number }
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  title = 'Shulutions'
  mainLinks: NavigationItem[] = []
  protectedLinks: NavigationItem[] = []

  userRoles: string[] = []

  constructor(public authService: AuthentificationService) { }

  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles();
    this.generateLinks();
  }

  generateLinks() {
    this.mainLinks = [
      { text: 'Home', icon: 'bi-house-fill', link: '/', exact: true },
      { text: 'Projects', icon: 'bi-info-square-fill', link: '/projects', exact: true },
      { text: 'Ideas', icon: 'bi-lightbulb-fill', link: '/ideas', exact: true },
    ];
  
    if (this.userRoles.includes('admin')) {
      this.protectedLinks = [
        { text: 'Admin', icon: 'bi-shield-fill', link: '/admin', exact: true },
      ];
    }
  }
  
  logout() {
    this.authService.logout()
  }

}
