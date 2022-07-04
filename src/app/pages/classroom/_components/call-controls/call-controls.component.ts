import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-call-controls',
  templateUrl: './call-controls.component.html',
  styleUrls: ['./call-controls.component.scss']
})
export class CallControlsComponent implements OnInit {
  isMic: boolean = true;
  isCamera: boolean = true;
  @Output() onCameraChange : EventEmitter<boolean> = new EventEmitter();
  
  @Output() onMicrophoneChange : EventEmitter<boolean> = new EventEmitter();
  
  @Input() screenSharing: boolean = false;
  @Output() screenSharingChange : EventEmitter<boolean> = new EventEmitter()
  
  
  @Output() onLeave : EventEmitter<void> = new EventEmitter()


  @Output() onOpenChat : EventEmitter<void> = new EventEmitter()
  @Input() unReadMessage = 0;
  startDate = null;
  timeElapsed = 0;

  // users = [{title : "Mohamed Benzaoui"}];

  constructor() { }

  ngOnInit(): void {

    setInterval(() => {
      this.timeElapsed++;
      this.startDate = new Date(this.timeElapsed * 1000).toISOString().substr(14, 5);
    }, 1000);
  }


  microphoneChange(){
    this.isMic = !this.isMic;
    this.onMicrophoneChange.emit(this.isMic);
  }

  cameraChange(){
    this.isCamera = !this.isCamera;
    this.onCameraChange.emit(this.isCamera);
  }

  onScreenSharingChange(){
    this.screenSharing = !this.screenSharing;
    this.screenSharingChange.emit(this.screenSharing);
  }


  onOpenChatFn(){
    this.onOpenChat.emit();
  }
  leave(){
    this.onLeave.emit();
  }

}
