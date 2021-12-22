import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification-service/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthentificationService, private router: Router){}

  canActivate(): boolean {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
