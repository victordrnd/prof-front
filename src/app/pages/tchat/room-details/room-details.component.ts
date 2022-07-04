import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbChatComponent, NbChatFormComponent } from '@nebular/theme';
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
    private router : Router,
    private authService: AuthService) { }

  @Input() roomId;
  
  room;
  messages;
  currentUser;

  subscriptions = [];
  async ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser);
    if (!this.roomId) {
      const sb = this.route.params.subscribe(params => {
        this.fetchRoom(params.id);
        this.chatService.currentRoomId = params.id;
      });
      this.subscriptions.push(sb);
    } else {
      this.fetchRoom(this.roomId);
      this.chatService.currentRoomId = this.roomId;
    }

    const sb1 = this.chatService.onNewMessage().subscribe(message => {
      if (message.roomId == this.room.id) {
        message = this.formatMessage(message);
        this.messages.push(message);
      }
    });
    this.subscriptions.push(sb1);
  }


  async fetchRoom(room_id) {
    this.room = await this.chatService.getRoom(room_id).toPromise();
    this.messages = await this.chatService.getRoomMessages(room_id).toPromise();
    this.messages = this.messages.map(message => this.formatMessage(message));
    this.chatService.clearUnReadMessageForRoom(this.room.id);

  }

  sendMessage(event) {
    console.log(event);
    let files = [];
    if (event.files.length) {
      files = !event.files ? [] : event.files.map((file) => {
        return {
          data: file,
          type: file.type,
          name: file.name,
        };
      });
    }

    this.chatService.sendMessage({
      type: files.length ? "file" : "text",
      files: files,
      userId: this.currentUser.id,
      roomId: this.room.id,
      content: event.message
    });
  }


  formatMessage(message) {
    const type = message.type;
    message.type = message.type != "text" ? "file" : "text";
    if (message.type == "file") {
      message.files = [{
        url: message.content,
        type: type,
        icon: 'file-text-outline'
      }];
    } else {
      message.text = message.content;
    }
    message.user = this.room.users.find(user => user.id == message.userId);
    message.reply = message.userId == this.currentUser.id;
    message.date = message.created_at;
    return message;
  }


  goToLesson(){
    if(this.currentUser.role.slug == "teacher"){
      this.router.navigate([`/teacher/lessons/${this.room.lessonId}`]);
    }else if (this.currentUser.role.slug == "student"){
      this.router.navigate([`/student/lessons/${this.room.lessonId}`]);
    }
  }

  ngOnDestroy(): void {
    this.chatService.currentRoomId = null;
    this.subscriptions.map(sb => sb.unsubscribe());
  }
}
