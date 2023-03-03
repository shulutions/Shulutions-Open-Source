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

  constructor(private authService: AuthentificationService) { }

  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles();
    this.generateLinks();
  }

  generateLinks() {
    this.mainLinks = [
      { text: 'Home', icon: 'home', link: '/', exact: true },
      { text: 'Projects', icon: 'info', link: '/projects', exact: true },
      { text: 'Login', icon: 'login', link: '/login', exact: true },
      { text: 'Register', icon: 'person_add', link: '/register', exact: true },
    ]

    if (this.userRoles.includes('admin')) {
      this.protectedLinks = [
        { text: 'Admin', icon: 'admin_panel_settings', link: '/admin', exact: true },
      ]
    }
  }

  logout() {
    this.authService.logout()
  }

}
