import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification-service/authentification.service';

interface NavigationItem {
  text: string
  icon: { outline: string; fill: string };
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

  constructor(public authService: AuthentificationService,  public router: Router) { }

  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles();
    this.generateLinks();
  }

  generateLinks() {
    this.mainLinks = [
      { text: 'Home', icon: { outline: 'bi-house', fill: 'bi-house-fill' }, link: '/', exact: true },
      { text: 'Projects', icon: { outline: 'bi-folder', fill: 'bi-folder-fill' }, link: '/projects', exact: true },
      { text: 'Ideas', icon: { outline: 'bi-lightbulb', fill: 'bi-lightbulb-fill' }, link: '/ideas', exact: true },
    ];
  
    if (this.userRoles.includes('admin')) {
      this.protectedLinks = [
        { text: 'Admin', icon: { outline: 'bi-shield', fill: 'bi-shield-fill' }, link: '/admin', exact: true },
      ];
    }
  }
  
  logout() {
    this.authService.logout()
  }

}
