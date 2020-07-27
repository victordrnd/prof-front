import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userService: AuthService) { }

  canActivate() {
    const result = this.userService.getToken();
    if (!result) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;

  }
}