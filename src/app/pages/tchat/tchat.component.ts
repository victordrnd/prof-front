import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss']
})
export class TchatComponent implements OnInit, OnDestroy {

  constructor(private chatService: ChatService,
    private router: Router) { }


  options: AnimationOptions = {
    path: '/assets/animations/education.json',
  };
  rooms;
  mobile = false;
  subscriptions = [];
  home = true;
  async ngOnInit() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)) {
      this.mobile = true;
    };
    this.home = this.router.url == "/messages";
    const sb3 = this.router.events.subscribe(el => {
      if (el instanceof NavigationEnd) {
        this.home = el.url == '/messages';
      }
    })
    this.chatService.clearUnReadMessage();
    await this.chatService.connect();
    await this.chatService.getMyRooms();
    this.rooms = this.chatService.rooms.value;
    const sb1 = this.chatService.rooms.subscribe(rooms => {
      this.rooms = rooms;
    });

    const sb = this.chatService.socket.fromEvent('new_room').subscribe(async room => {
      await this.chatService.connect(true);
      this.chatService.getMyRooms();
    });

    this.subscriptions.push(sb, sb1, sb3);

    if (this.rooms.length) {
      this.goToRoom(this.rooms[0].id);
    }


  }




  goToRoom(room_id) {
    this.router.navigate(['/messages/room/' + room_id]);
  }


  ngOnDestroy(): void {
    this.subscriptions.map(sb => sb.unsubscribe());
  }
}
