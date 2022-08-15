import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: any;
  token;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NbToastrService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
  });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [null, Validators.required],
      repeat_password: [null, Validators.required],
    })
  }

  submit() {
    this.authService.changePassword(this.form.value, this.token).toPromise().then(success => {
      this.notificationService.primary(this.translate.instant('reset_pass.success.desc'), this.translate.instant('reset_pass.success.title'))
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
