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

  unreadMessageCount = new BehaviorSubject(0);

  audioService = new Audio();
  constructor(private http : HttpClient, private socket : Socket,
    private userService : AuthService) { }


  connect(){
    console.log(this.isRegistred);
    if(!this.isRegistred){
      this.socket.emit("register", {userId : this.userService.currentUserValue.id});
      this.isRegistred = true;
     this.clearUnReadMessage();
      this.socket.fromEvent('new_message').subscribe((message:any) => {
        if(message.userId != this.userService.currentUserValue.id){
          this.audioService.src = "../../../assets/mp3/message.mp3"
          this.audioService.load();
          this.audioService.play();
          if(message.roomId != this.currentRoomId){
            this.unreadMessageCount.next(this.unreadMessageCount.value + 1);
          }
        }
      })
    }
  }

  clearUnReadMessage(){
    this.unreadMessageCount.next(0);
  }


  getMyRooms(){
    return this.http.get(`${environment.chatServer}/rooms/my`);
  }


  getRoomMessages(room_id ){
    return this.http.get(`${environment.chatServer}/rooms/${room_id}/messages`);
  }


  createRoom(obj : CreateRoomDto){
    return this.http.post(`${environment.chatServer}/rooms`, obj);
  }


  getRoom(room_id){
    return this.http.get(`${environment.chatServer}/rooms/${room_id}`);
  }


  sendMessage(content : CreateMessageDto){
    this.socket.emit('new_message', content)
  }

  public onNewMessage(): Observable<any> {

    this.socket.on('new_message', (MESSAGE) => console.log(MESSAGE));
    return this.socket.fromEvent<any>('new_message');
  }
}

class CreateMessageDto{
  type : string;
  content : string;
  files? : any[];
  userId:number;
  roomId : number; 
}

class CreateRoomDto  {
  name = "";
  users? = [];
  withAdmin = false;

}
