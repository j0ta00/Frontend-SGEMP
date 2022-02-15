import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

constructor(private _authService: AuthService, private _router: Router) {}

canActivate(): boolean {
    
  if(this._authService.isUsserLogged()) {
    this._router.navigate(['/home'])
    return false;
  } else {
    return true
  }

}

  
}
