import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  mobile: boolean;
  collapsed = false;
  constructor(private userService: AuthService) { }

  ngOnInit() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || document.documentElement.clientWidth <= 500) {
      this.mobile = true;
      this.collapsed = true;

    };
    // this.socket.connect();
    // this.socket.emit("register", {userId : this.userService.currentUserValue.id});
  }


  closeMenu(){
    console.log('exec');
    if(this.mobile){
      this.collapsed = true;
    }
  }


  logout() {
    this.userService.purgeAuth();
    document.location.reload();
  }

}
