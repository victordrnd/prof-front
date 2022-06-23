import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(private authService : AuthService,
    private notificationService: NbToastrService,
    private translate : TranslateService,
    private router : Router,
    private fb : FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email : [null, [Validators.email,Validators.required]],
      password : [null, Validators.required]
    })
  }

  submit(){
    this.authService.attemptAuth(this.form.value).toPromise().then(res => {
      if(!res.user.address){
        this.router.navigate([`/register`, { step: 3}]);
      }else{
        if(res.user.role.slug == 'student'){
          this.router.navigate(['student/dashboard']);
        }else if (res.user.role.slug == 'teacher'){
          this.router.navigate(['teacher/dashboard']);
        }else if (res.user.role.slug == 'admin'){
          this.router.navigate(['admin']);
        }
      }
    }).catch(err => {
      for (const [key, value] of Object.entries(err)) {
        this.notificationService.danger(this.translate.instant('register.error.desc'), value)
      }
    })
  }

 
}
