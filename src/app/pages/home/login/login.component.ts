import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService,
    private notificationService: NbToastrService,
    private translate : TranslateService) { }

  credentials = {
    email : null,
    password : null
  }
  ngOnInit() {
  }

  submit(){
    this.authService.attemptAuth(this.credentials).toPromise().then(res => {
      //TODO : redirect to dashboard
    }).catch(err => {
        this.notificationService.danger(this.translate.instant('register.error.desc'), err.error)
    })
  }

 
}
