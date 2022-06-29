import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ZoomVideo, { Participant, VideoQuality } from '@zoom/videosdk';
import { AuthService } from 'src/app/core/services/auth.service';
import { ZoomService } from 'src/app/core/services/zoom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private userService: AuthService,
    private zoomService: ZoomService) { }

  participants = 0;
  lesson_id;

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
  async ngOnInit() {
    this.lesson_id = this.route.snapshot.params.id;
    this.client = this.zoomService.createClient();
    this.client.init('fr-FR', 'CDN');
  }

  async initConnection() {
    if (!this.connected) {
      this.connected = true;
      this.jwt = await this.zoomService.generateSignature(this.lesson_id).toPromise();
      await this.client.join("Lesson " + this.lesson_id, this.jwt.token, this.name, "")
      this.stream = this.client.getMediaStream();
      this.stream.enableHardwareAcceleration(true)
      // if((window as any).chrome && !(typeof SharedArrayBuffer === 'function')) {
      this.stream.startVideo({ videoElement: document.querySelector('#video') });
      this.startAudio();
      // } else {
      //   this.stream.startVideo(() => {
      //     this.stream.renderVideo(document.querySelector('#video-fallback'), this.client.getCurrentUserInfo().userId, 1920, 1080, 0, 0, 3)
      //   })
      // }

      this.chat = this.client.getChatClient();
      setTimeout(() => {
        this.renderVideos();
        this.started = true;
      }, 5000)
      this.client.on('peer-video-state-change', (payload) => {
        if (payload.action === 'Start') {
          this.participants++
          this.renderVideos(payload);
          console.log('new participant');
        } else if (payload.action === 'Stop') {
          this.stream.stopRenderVideo(document.querySelector('#participants-canvas'), payload.userId);
        }
      })

      this.client.on('media-sdk-change', (payload) => {
        if (payload.type === 'audio' && payload.result === 'success') {
          if (payload.action === 'encode') {
            this.audioEncode = true
          } else if (payload.action === 'decode') {
            this.audioDecode = true
          }
        }
      });


      this.client.on('active-share-change', (payload) => {
        if (payload.state === 'active') {
          this.stream.clearVideoCanvas(document.querySelector('#participants-canvas'));
          this.stream.startShareView(document.querySelector('#participants-canvas'), payload.userId)
        } else if (payload.state === 'inactive') {
          this.stream.stopShareView()
        }
      });
    }

  }


  renderVideos(payload = null) {
    let participants: Participant[] = this.client.getAllUser();
    const userId = this.client.getCurrentUserInfo().userId
    const size = Math.floor(Math.sqrt(participants.length - 1));
    let row = -1
    console.log("rerendering participants", participants, "size : " + size);
    if (payload) {
      console.log(payload);
      this.stream.renderVideo(document.querySelector('#participants-canvas'), payload.userId, 300, 100, 0, 0, 2);
    }
    else {
      const participant = participants.find(participant => participant.userId != userId);
      console.log(participant);
      if (participant) {
        this.stream.renderVideo(document.querySelector('#participants-canvas'), participant.userId, 300, 100, 0, 0, 2);
      }
    }

  }

  toogleCamera(evt) {
    if (evt) {
      this.stream.startVideo({ videoElement: document.querySelector('#video') })
    } else {
      this.stream.stopVideo();
    }
  }

  onMicrophoneChange(activated) {
    console.log(this.client, this.stream);

    if (activated)
      this.stream.unmuteAudio();
    else
      this.stream.muteAudio()


    // this.client.on('active-speaker', (payload) => {
    //   console.log('Active speaker', payload)
    // })
  }


  onScreenSharingChange(activated) {
    if (this.inputs.camera) {
      this.toogleCamera(false);
    }
    if (activated) {
      if (!!(window as any).chrome) {
        this.stream.startShareScreen(document.querySelector('#video'))
      } else {
        this.stream.startShareScreen(document.querySelector('#video-fallback'))
      }
    } else {
      this.stream.stopShareScreen();
      if (this.inputs.camera) {
        this.toogleCamera(true);
      }
    }
  }


  startAudio() {
    var isSafari = (window as any).safari !== undefined
    if (isSafari) {
      if (this.audioEncode && this.audioDecode) {
        this.stream.startAudio()
      }
    } else {
      this.stream.startAudio()
    }
  }


  openChat() {
    this.unReadMessage = 0
    this.inputs.chat = true;
    const userId = this.client.getCurrentUserInfo().userId;
    if (this.messages.length == 0) {
      this.messages = this.chat.getHistory().map(message => {
        message.date = new Date(message.timestamp * 1000);
        message.reply = userId == message.sender.userId;
        return message;
      });
      this.client.on('chat-on-message', (message) => {
        message.date = new Date(message.timestamp * 1000);
        message.reply = userId == message.sender.userId;
        this.messages.push(message);
        if (!this.inputs.chat) {
          this.unReadMessage++;
        }
      })
    }
  }


  sendMessage(message) {
    this.chat.sendToAll(message.message);
  }

  leaveSession() {
    this.client.leave();
  }

}
