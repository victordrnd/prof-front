import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService) { }
  

  room;
  messages;
  currentUser;

  subscriptions  = [];
  async ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    const sb = this.route.params.subscribe(params => {
      this.fetchRoom(params.id);
      this.chatService.currentRoomId = params.id;
    });
    const sb1 = this.chatService.onNewMessage().subscribe(message => {
      if(message.roomId == this.room.id){
        message = this.formatMessage(message);
        this.messages.push(message);
      } 
    })
    this.subscriptions.push(sb, sb1);
  }


  async fetchRoom(room_id){
    this.room = await this.chatService.getRoom(room_id).toPromise();
    console.log(this.room);
    this.messages = await this.chatService.getRoomMessages(room_id).toPromise();
    this.messages = this.messages.map(message => this.formatMessage(message));
  }

  sendMessage(event) {
    this.chatService.sendMessage({
      type: "text",
      userId: this.currentUser.id,
      roomId: this.room.id,
      content: event.message
    });
  }


  formatMessage(message) {
    message.user = this.room.users.find(user => user.id == message.userId);
    message.reply = message.userId == this.currentUser.id;
    message.text = message.content;
    message.date = message.created_at;
    return message;
  }


  ngOnDestroy(): void {
    this.subscriptions.map(sb => sb.unsubscribe());
  }
}
