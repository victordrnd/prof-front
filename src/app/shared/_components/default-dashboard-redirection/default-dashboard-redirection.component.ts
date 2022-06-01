import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-default-dashboard-redirection',
  templateUrl: './default-dashboard-redirection.component.html',
  styleUrls: ['./default-dashboard-redirection.component.scss']
})
export class DefaultDashboardRedirectionComponent implements OnInit {

  constructor(private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if(user.role.slug == 'student'){
      this.router.navigate(['/student/dashboard']);
    }else{
      this.router.navigate(['/teacher/dashboard']);
    }
  }

}
