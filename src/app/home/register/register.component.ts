import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  form = {
    type : "student"
  }
  ngOnInit() {
  }

  select(type = 'student'){
    this.form.type = type;
  }

}
