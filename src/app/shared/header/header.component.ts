import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { NbToastrService } from '@nebular/theme';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  language = localStorage.getItem('language') ?? navigator.language.slice(0,2);
  isConnected: any;
  unreadMessageCount = 0;
  user;
  timeLeft = 30;
  isTimeOut = true;
  interval;

  constructor(private translationService: TranslateService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private chatService: ChatService,
    private toastrService: NbToastrService,
    private translate: TranslateService,
    public router: Router) { }

  async ngOnInit() {
    this.isConnected = this.authService.getToken() ? true : false;
    if(this.isConnected){
      this.chatService.connect();
    }
    this.chatService.unreadMessageCount.subscribe(count => {
      this.unreadMessageCount = count
    });
    this.cdr.markForCheck();
    await this.authService.populate();
    this.user = this.authService.currentUserValue;
  }

  languageChange(language = 'en') {
    localStorage.setItem('language', language);
    this.translationService.use(language);
  }
  async goToDashboard() {
    await this.authService.populate();
    this.user = this.authService.currentUserValue;
    if (this.user.role.slug == 'student') {
      this.router.navigate(['student/dashboard']);
    } else if (this.user.role.slug == 'teacher') {
      this.router.navigate(['teacher/dashboard']);
    } else if (this.user.role.slug == 'admin') {
      this.router.navigate(['admin']);
    }
  }


  goToMessages() {
    this.router.navigate(['/messages']);
  }
  async logout() {
    await this.authService.purgeAuth();
    this.router.navigate(['/']);
  }

  async sendEmail() {
    this.isTimeOut = false;
    await this.authService.sendEmail().toPromise().then(res => {

      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.isTimeOut = true;
          this.timeLeft = 30;
          clearInterval(this.interval);
        }
      },1000)

      this.toastrService.primary(this.translate.instant('reset_pass.success.descMail'), this.translate.instant('reset_pass.success.title'));
    }).catch(err => {
      this.toastrService.danger("Error", "An error has occured");
    });
  }
}
