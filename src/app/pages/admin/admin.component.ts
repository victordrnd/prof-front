import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  mobile = false;
  constructor(private authService : AuthService,
    private chatService :  ChatService,
    private router : Router) { }

  ngOnInit(): void {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)) {
      this.mobile = true;
    };
    this.chatService.connect();
  }

  logout() {
    this.authService.purgeAuth();
    this.router.navigate(['']);
  }



}
