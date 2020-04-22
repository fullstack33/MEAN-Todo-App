import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _userService: UserServiceService, private _route: Router){}
  canActivate(): boolean {
    if(this._userService.loggedIn()){
      return true
    }else{
      this._route.navigate(['/signIn']);
      return false
    }
  }

}
