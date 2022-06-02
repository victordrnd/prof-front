import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userService: AuthService) { }

  async canActivate() {
    await this.userService.populate()
    const result = this.userService.getToken();
    if (!result) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;

  }
}