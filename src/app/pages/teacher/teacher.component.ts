import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  constructor(private userService : AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.userService.purgeAuth();
    document.location.reload();
  }

}
