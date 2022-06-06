import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  language = localStorage.getItem('language') ?? 'en';
  isConnected: any;
  constructor(private translationService: TranslateService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    public router: Router) { }

  ngOnInit() {
    this.isConnected = this.authService.getToken() ? true : false;
    this.cdr.markForCheck();
  }

  languageChange(language = 'en') {
    localStorage.setItem('language', language);
    this.translationService.use(language);
  }
  async goToDashboard() {
    await this.authService.populate();
    const user = this.authService.currentUserValue;
    if (user.role.slug == 'student') {
      this.router.navigate(['student/dashboard']);
    } else {
      this.router.navigate(['teacher/dashboard']);
    }

  }

  logout() {
    this.authService.purgeAuth();
    this.router.navigate(['/']);
  }

}
