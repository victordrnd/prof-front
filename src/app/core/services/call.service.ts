import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private peerConnectionSubject = new BehaviorSubject<RTCPeerConnection>(this.openRTCConnection());
  currentRoomId = null;
  subscriptions = [];
  stream: MediaStream;
  videoTrack: RTCRtpSender;

  onNewParticipant: Subject<any> = new Subject();
  onNewMessage: Subject<ClassRoomMessage> = new Subject();
  onRemoteCameraChange: Subject<CameraToggleEvent> = new Subject();
  constructor(private socket: Socket) {
    this.socket.ioSocket.io.opts.query = { Authorization: `Bearer ${localStorage.getItem('token')}`}
   }


  async joinRoom(joinRoomInfo: JoinRoom, video = true, audio = true) {
    this.peerConnection.onicecandidate = (ev: RTCPeerConnectionIceEvent) => {
      if (ev.candidate) {
        const candidate: NewIceCandidateInfo = {
          candidat: ev.candidate,
          room_id: joinRoomInfo.room_id
        };
        this.socket.emit('classroom.new-ice-candidate', candidate)
      }
    }
    this.peerConnection.onnegotiationneeded = (ev) => {
      this.peerConnection.createOffer().then(d => this.peerConnection.setLocalDescription(d))
        .then(() => {
          const negociating: NegociatingInfo = {
            room_id: joinRoomInfo.room_id,
            sessionDescription: this.peerConnection.localDescription
          }
          this.socket.emit('classroom.negociating', negociating);
        })
        .catch(e => console.log(e));
    }

    const sb = this.socket.fromEvent<NegociatingInfo>('classroom.negociating').subscribe((negociating: NegociatingInfo) => {
      this.sendAnswer(negociating.sessionDescription);
    });


    const sb1 = this.socket.fromEvent<AnswerInfo>('classroom.answer').subscribe(async (answer: AnswerInfo) => {
      if (!this.peerConnection.remoteDescription) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer.answer));
        this.onNewParticipant.next(answer);
      }
    });

    const sb2 = this.socket.fromEvent<userInfo>('classroom.need_answer').subscribe((userInfo: userInfo) => {
      this.sendAnswer(userInfo.sessionDescription, video, audio);
    })

    const sb3 = this.socket.fromEvent<RTCIceCandidate>('classroom.new-ice-candidate').subscribe(async (candidat: any) => {
      const iceCandidat = new RTCIceCandidate(candidat);
      try { await this.peerConnection.addIceCandidate(iceCandidat); } catch (e) { }
    });

    const sb5 = this.socket.fromEvent<ClassRoomMessage>('classroom.new_message').subscribe((message: ClassRoomMessage) => {
      this.onNewMessage.next(message);
    });

    const sb6 = this.socket.fromEvent('classroom.camera_toggle').subscribe((event : CameraToggleEvent)=> {
      this.onRemoteCameraChange.next(event);
    });


    const sb4 = this.socket.fromEvent('classroom.disconnect').subscribe(ev => {
      this.clearSubscription();
    });



    this.socket.emit('classroom.join', joinRoomInfo);
    this.subscriptions.push(sb, sb1, sb2, sb3, sb4, sb5, sb6);
  }


  async sendAnswer(session: RTCSessionDescription, video = true, audio = true) {
    if (!this.stream) {
      await this.getMediaStream(video, audio);
      this.addTracksToPeerConnection(this.stream);
    }
    if (!this.peerConnection.remoteDescription) {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(session))
      const answer = await this.peerConnection.createAnswer();
      this.peerConnection.setLocalDescription(answer);
      const answerInfo: AnswerInfo = {
        room_id: this.currentRoomId,
        answer: answer
      }
      this.socket.emit('classroom.answer', answerInfo);
      this.onNewParticipant.next(answer);
    }
  }

  async createOffer(video = true, audio = true) {
    await this.getMediaStream(video, audio);
    this.addTracksToPeerConnection(this.stream);
    let sessionDescription: RTCSessionDescriptionInit = await this.peerConnection.createOffer();
    this.peerConnection.setLocalDescription(sessionDescription);
    return sessionDescription;
  }


  startAudio() {
    if (this.stream) {
      this.stream.getAudioTracks().forEach(track => track.enabled = true);
    }
  }

  stopAudio() {
    this.stream.getAudioTracks().forEach(track => track.enabled = false);
  }


  startVideo() {
    this.stream.getVideoTracks().forEach(track => track.enabled = true);
    this.socket.emit('classroom.camera_toggle', {room_id : this.currentRoomId, active : true})
  }

  stopVideo() {
    //this.stream.getVideoTracks().forEach(track => track.stop());
    this.stream.getVideoTracks().forEach(track => track.enabled = false);
    this.socket.emit('classroom.camera_toggle', {room_id : this.currentRoomId, active : false});
  }


  sendMessage(message: ClassRoomMessage) {
    this.socket.emit('classroom.new_message', message);
  }


  addTracksToPeerConnection(stream: MediaStream): void {
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        if (track.kind == "video") {
          // this.videoTrack = track
        }
        this.peerConnection.addTrack(track, stream);
      });
    }
  }


  async getMediaStream(video = true, audio = true) {
    let inputs = { audio, video };
    try {
      if (navigator.mediaDevices) {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: audio, video: video ? {
            width: { ideal: 4096 },
            height: { ideal: 2160 },
            //facingMode: "user",
          } : false
        });
      }
    } catch (e) {
      console.log(e);
      inputs = { audio : false, video }
      this.stream = await navigator.mediaDevices.getUserMedia(inputs);
    }
    return inputs;
  }


  async startScreenShare() {
    // @ts-ignore
    const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
    const screenTrack = stream.getVideoTracks()[0];
    if (this.videoTrack) {
      this.videoTrack.replaceTrack(screenTrack);
      try {
        this.videoTrack = this.peerConnection.addTrack(screenTrack, this.stream)
      } catch (e) {
        this.stream.getVideoTracks().forEach(track => track.enabled = true);
      }
    } else {
      this.addTracksToPeerConnection(stream)
    }
  }



  async stopScreenShare() {
    if (this.stream) {
      this.stream.getVideoTracks().forEach(track => {
        track.enabled = false;
      });
    }
  }

  private openRTCConnection(): RTCPeerConnection {
    return new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        // {
        //   urls: "turn:srv1.victordurand.fr",
        //   username: "visio",
        //   credential: "123+aze"
        // }
      ]
    });
  }

  sendDisconnect() {
    this.socket.emit('classroom.disconnect', {});
  }

  clearSubscription() {
    if(this.stream){
      this.stream.getTracks().map(track => track.stop());
    }
    this.peerConnection.ontrack = null;
    this.peerConnection.onicecandidate = null;
    this.peerConnection.oniceconnectionstatechange = null;
    this.peerConnection.onsignalingstatechange = null;
    this.peerConnection.onicegatheringstatechange = null;
    this.peerConnection.onnegotiationneeded = null;
    this.peerConnection.close();
    this.stream = null;

    this.peerConnectionSubject.next(this.openRTCConnection());
    this.subscriptions.map(subscription => subscription.unsubscribe());
    console.log('La connexion a été interrompu, refreshing');
    window.location.reload();
  }


  get peerConnection() {
    return this.peerConnectionSubject.getValue()
  }
}

interface userInfo {
  user_id: number;
  sessionDescription: RTCSessionDescription;
  socket_id: string;
}

interface JoinRoom {
  room_id: number;
  user_id: number;
  sessionDescription: RTCSessionDescriptionInit
}

interface NewIceCandidateInfo {
  room_id: number;
  candidat: RTCIceCandidate
}

interface NegociatingInfo {
  room_id: number;
  sessionDescription: RTCSessionDescription
}

interface AnswerInfo {
  room_id: number;
  answer: RTCSessionDescriptionInit
}

interface ClassRoomMessage {
  type: any;
  files: any;
  content: string;
  user_id: number;
  date: Date;
  room_id: number;
  reply?: boolean;
  user?: any
}

interface CameraToggleEvent {
  room_id : number;
  active : boolean;
}