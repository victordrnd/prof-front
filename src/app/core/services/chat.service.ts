import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  isRegistred = false;
  currentRoomId = null;

  rooms = new BehaviorSubject([]);
  unreadMessageCount = new BehaviorSubject(0);

  audioService = new Audio();
  constructor(private http: HttpClient, private socket: Socket,
    private userService: AuthService) { }


  async connect() {
    if (!this.isRegistred) {
      await this.getMyRooms();
      this.socket.emit("register", { userId: this.userService.currentUserValue.id });
      this.isRegistred = true;
      this.clearUnReadMessage();
      this.socket.fromEvent('new_message').subscribe((message: any) => {
        this.setNewMessage(message);
        if (message.userId != this.userService.currentUserValue.id) {
          this.audioService.src = "../../../assets/mp3/message.mp3"
          this.audioService.load();
          this.audioService.play();
          if (message.roomId != this.currentRoomId) {
            this.unreadMessageCount.next(this.unreadMessageCount.value + 1);
          }
        }
      })
    }
  }

  clearUnReadMessage() {
    this.unreadMessageCount.next(0);
  }


  clearUnReadMessageForRoom(room_id) {
    const rooms = this.rooms.value;
    const room = rooms.find(room => room.id == room_id);
    room.new_message = false;
    this.rooms.next(rooms);
  }

  private setNewMessage(message) {
    const rooms = this.rooms.value;
    const room = rooms.find(room => room.id == message.roomId);
    if(message.userId != this.userService.currentUserValue.id && message.roomId != this.currentRoomId){
      room.new_message = true;
    }
    room.updated_at = new Date().toISOString();
    room.last_message = message;
    const sorted = rooms.sort((a, b)=> new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    this.rooms.next(sorted);
  }



  async getMyRooms() {
    const rooms: any[] = await this.http.get(`${environment.chatServer}/rooms/my`).toPromise() as any;
    this.rooms.next(rooms);
  }


  getRoomMessages(room_id) {
    return this.http.get(`${environment.chatServer}/rooms/${room_id}/messages`);
  }


  createRoom(obj: CreateRoomDto) {
    return this.http.post(`${environment.chatServer}/rooms`, obj);
  }


  getRoom(room_id) {
    return this.http.get(`${environment.chatServer}/rooms/${room_id}`);
  }


  sendMessage(content: CreateMessageDto) {
    this.socket.emit('new_message', content)
  }

  public onNewMessage(): Observable<any> {

    return this.socket.fromEvent<any>('new_message');
  }
}

class CreateMessageDto {
  type: string;
  content: string;
  files?: any[];
  userId: number;
  roomId: number;
}

class CreateRoomDto {
  name = "";
  users?= [];
  withAdmin = false;

}
