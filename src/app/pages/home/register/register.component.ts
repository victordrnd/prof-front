import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  activatedRoute: ActivatedRoute;
  step : number = 1
  initGroup: any;
  subscription: Subscription;
  form: any;
  constructor(private route: ActivatedRoute,
    private router : Router,
    private fb : FormBuilder,
    private authService : AuthService,
    private notificationService : NbToastrService,
    private translate : TranslateService) { }


  ngOnInit() {
    this.form = this.fb.group({
        type : ["student", Validators.required],
        firstname : [null, Validators.required],
        lastname : [null, Validators.required],
        email : [null,[Validators.email, Validators.required]],
        password : [null, Validators.required],
        repeat_password : [null, Validators.required],
        sexe : ["m", Validators.required]
    });
    this.subscription = this.route.params.subscribe(async (params: any) => {
      if (params.step) {
        this.step = params.step;
        this.form.controls.type.value = params.type ?? 'student';
      }
    });
  }

  select(type = 'student'){
    this.form.controls.type.value = type;
  }

  nextStep(){
    if(this.step < 2){
      this.step++;
      this.router.navigate([`.`, { step : this.step, type : this.type.value }], { relativeTo: this.route });
    }else{
      this.submit();
    }
  }

  async submit(){
    const user = this.form.value
    await this.authService.addUser(user).toPromise().then(success => 
      this.notificationService.success(this.translate.instant('register.success.desc'),this.translate.instant('register.success.title')))
      .catch(err => {
        for (const [key, value] of Object.entries(err.error)) {
          this.notificationService.danger(this.translate.instant('register.error.desc'), value)
        }
      })
  }

  get type(){
    return this.form.get('type');
  }
}
