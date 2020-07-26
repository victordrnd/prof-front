import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService,
    private notificationService: NbToastrService,
    private translate : TranslateService,
    private router : Router) { }

  credentials = {
    email : null,
    password : null
  }
  ngOnInit() {
  }

  submit(){
    this.authService.attemptAuth(this.credentials).toPromise().then(res => {
      //TODO : redirect to dashboard
      if(!res.user.address){
        this.router.navigate([`/register`, { step: 3,  }]);
      }
    }).catch(err => {
      for (const [key, value] of Object.entries(err)) {
        this.notificationService.danger(this.translate.instant('register.error.desc'), value)
      }
        // this.notificationService.danger(this.translate.instant('register.error.desc'), err.error)
    })
  }

 
}
