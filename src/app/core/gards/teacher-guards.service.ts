import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuardService implements CanActivate {

  constructor(private userService: AuthService) { }

  async canActivate() {
    const user = this.userService.currentUserValue;
    return user.role.slug == "teacher";
  }
}