import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  activatedRoute: ActivatedRoute;
  form = {
    type : "student",
    sexe : "m"
  }
  step : number = 1
  initGroup: any;
  subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private router : Router) { }
  ngOnInit() {
    this.subscription = this.route.params.subscribe(async (params: any) => {
      if (params.step) {
        this.step = params.step;
        this.form.type = params.type ?? 'student';
        console.log(this.step);
      }
    });

  }

  select(type = 'student'){
    this.form.type = type;
  }

  nextStep(){
    if(this.step < 2){
      this.step++;
      this.router.navigate([`.`, { step : this.step, type : this.form.type }], { relativeTo: this.route });
    }
  }

}
