import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  language = localStorage.getItem('language') ?? 'en';
  isConnected: any;
  unreadMessageCount = 0;
  constructor(private translationService: TranslateService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService,
    public router: Router) { }

  ngOnInit() {
    this.isConnected = this.authService.getToken() ? true : false;
    // this.chatService.unreadMessageCount.subscribe(count => {
    //   this.unreadMessageCount = count
    // });
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
    } else if (user.role.slug == 'teacher') {
      this.router.navigate(['teacher/dashboard']);
    } else if (user.role.slug == 'admin') {
      this.router.navigate(['admin']);
    }

  }


  goToMessages() {
    this.router.navigate(['/messages']);
  }
  logout() {
    this.authService.purgeAuth();
    this.router.navigate(['/']);
  }

}
