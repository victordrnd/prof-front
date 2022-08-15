import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-mail',
  templateUrl: './forgot-password-mail.component.html',
  styleUrls: ['./forgot-password-mail.component.scss']
})
export class ForgotPasswordMailComponent implements OnInit {

  form: any;

  constructor(private authService : AuthService,
              private fb : FormBuilder,
              private router : Router,
              private notificationService: NbToastrService,
              private translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email : [null, [Validators.email,Validators.required]]
    })
  }

  submit(){
    this.authService.sendMailForgotPassword(this.form.value).toPromise().then(success => {
      this.notificationService.primary(this.translate.instant('reset_pass.success.descMail'), this.translate.instant('reset_pass.success.title'))
      this.router.navigate([`/login`]);
    }).catch(err => {
      if (err.error) {
        this.notificationService.danger(err.error.errors[Object.keys(err.error.errors)[0]], this.translate.instant('shared.error'))
      } else {
        for (const [key, value] of Object.entries(err)) {
          this.notificationService.danger(this.translate.instant('register.error.desc'), value)
        }
      }
    })
  }

}
