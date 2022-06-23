import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router, private userService: AuthService) { }

  async canActivate() {
    await this.userService.populate();
    const user = this.userService.currentUserValue;
    if (user?.role?.slug != 'admin' || !this.userService.getToken()) {
      this.router.navigate(['']);
      return false;
    }
    return true;

  }
}