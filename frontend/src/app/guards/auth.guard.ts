import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification-service/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthentificationService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    
    let url: string = state.url;
    return this.checkLoginAndRoles(next, url);
  }

  checkLoginAndRoles(route: ActivatedRouteSnapshot, url: any): boolean {
    if(this.auth.isAuthenticated()){
      const userRoles = this.auth.getUserRoles();
      const routeRoles = route.data.roles;

      if (routeRoles && !routeRoles.some((role: string) => userRoles.includes(role))) {
        // this.router.navigate(['/forbidden']); // TODO: create forbidden page
        this.router.navigate(['/']);
        console.log("forbidden")
        return false;
      }
      return true;
    } 

    this.router.navigate(['login']);
    return false;
  } 
}
