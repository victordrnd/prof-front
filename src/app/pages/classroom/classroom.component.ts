import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ZoomVideo, { Participant, VideoQuality } from '@zoom/videosdk';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/core/services/auth.service';
import { CallService } from 'src/app/core/services/call.service';
import { LessonService } from 'src/app/core/services/lesson.service';
import { ZoomService } from 'src/app/core/services/zoom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit, OnDestroy {
  @ViewChild('participantVideo') participantVideo!: ElementRef;
  @ViewChild('videoFallBack') videoFallBack!: ElementRef;
  constructor(private route: ActivatedRoute,
    private userService: AuthService,
    private callService: CallService,
    private lessonService: LessonService) { }


  participants = 0;
  lesson_id;

  options: AnimationOptions = {
    path: '/assets/animations/education.json',
  };


  client;
  stream;
  audioEncode = false;
  audioDecode = false;
  connected = false;
  jwt: any;

  inputs = { camera: true, mic: true, screenShare: false, chat: false };
  messages = [];
  chat;
  name = this.userService.currentUserValue.firstname + " " + this.userService.currentUserValue.lastname;
  unReadMessage = 0;
  started = false;
  connectedUser;
  lesson = null;
  async ngOnInit() {
    this.lesson_id = this.route.snapshot.params.id;
    this.callService.currentRoomId = this.lesson_id;
    this.lesson = await this.lessonService.find(this.lesson_id).toPromise();
    this.getConnectedUser();
  }

  async initConnection() {
    if (!this.connected) {
      this.connected = true;
      await this.callService.joinRoom({
        room_id: this.lesson_id,
        user_id: this.userService.currentUserValue.id,
        sessionDescription: await this.callService.createOffer(this.inputs.camera, this.inputs.mic)
      });
      this.startVideoFallback();
      this.callService.peerConnection.ontrack = (ev: any) => {
        this.started = true;
        this.participantVideo.nativeElement.srcObject = ev.streams[0];
      };

      this.callService.onNewParticipant.subscribe(participant => {
        this.started = true;
      });

      this.callService.onNewMessage.subscribe((message) => {
        const type = message.type;
        console.log(message);
        message.type = message.type != "text" ? "file" : "text";
        if (message.type == "file") {
          message.files = [{
            url: message.content,
            type: type,
            icon: 'file-text-outline'
          }];
        } 
        message.reply = this.userService.currentUserValue.id == message.user_id;
        if (!message.reply) {
          message.user = this.connectedUser
        } else {
          message.user = this.userService.currentUserValue;
        }
        this.messages.push(message);
        if (!this.inputs.chat) {
          this.unReadMessage++;
        }
      });

      this.callService.onRemoteCameraChange.subscribe(event => {
        this.connectedUser.camera = event.active;
        // console.log(event, this.connectedUser);;
      });

    }
  }



  toogleCamera(evt) {
    this.inputs.camera = evt;
    if (evt) {
      this.callService.startVideo();
    } else {
      this.callService.stopVideo();
    }
  }

  onMicrophoneChange(activated) {
    this.inputs.mic = activated;
    if (activated)
      this.callService.stopAudio();
    else
      this.callService.startAudio()
  }



  onScreenSharingChange(activated) {
    this.inputs.screenShare = activated;
    // if (this.inputs.camera) {
    //   this.toogleCamera(false);
    // }
    if (activated) {
      this.callService.startScreenShare()
    } else {
      this.callService.stopScreenShare();
      if (this.inputs.camera) {
        this.toogleCamera(true);
      }
    }
  }


  openChat() {
    this.unReadMessage = 0
    this.inputs.chat = true;
  }


  sendMessage(message) {
    // delete message.files;
    if (message.files.length) {
      let files = !message.files ? [] : message.files.map((file) => {
        return {
          data: file,
          type: file.type,
          name: file.name,
        };
      });
      message.files = files;
    }else{
      message.type= "text"
    }
    message.date = new Date().getTime();
    message.room_id = this.lesson_id;
    message.user_id = this.userService.currentUserValue.id;
    this.callService.sendMessage(message);
  }

  getConnectedUser() {
    if (this.userService.currentUserValue.id == this.lesson.teacher_id) {
      this.connectedUser = this.lesson.students[0] || null;
    } else {
      this.connectedUser = this.lesson.teacher;
    }
    this.connectedUser.camera = true;
    console.log(this.connectedUser);
  }

  startVideoFallback() {
    if (this.callService.stream) {
      this.videoFallBack.nativeElement.srcObject = this.callService.stream;
    }
  }
  leaveSession() {
    this.callService.sendDisconnect();
    this.callService.clearSubscription();
  }

  getInitial() {
    return this.connectedUser?.firstname?.charAt(0) + this.connectedUser?.lastname?.charAt(0)
  }


  ngOnDestroy(): void {
    this.callService.sendDisconnect();
    this.callService.clearSubscription();
  }
}
