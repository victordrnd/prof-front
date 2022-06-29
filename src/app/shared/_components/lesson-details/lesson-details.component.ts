import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/core/services/auth.service';
import { LessonService } from 'src/app/core/services/lesson.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { VideoSDKMeeting } from '@videosdk.live/rtc-js-prebuilt';
import { environment } from 'src/environments/environment';
import { LessonSettingsModalComponent } from '../lesson-settings-modal/lesson-settings-modal.component';
import { ChatService } from 'src/app/core/services/chat.service';
import ZoomVideo from '@zoom/videosdk'
import { ZoomService } from 'src/app/core/services/zoom.service';
@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss']
})
export class LessonDetailsComponent implements OnInit {
  lesson
  loading = true;
  isTeacher;
  date = new Date();
  isPast = false;

  paymentLoading = false;
  constructor(private route: ActivatedRoute,
    private lessonService: LessonService,
    private modalService: NzModalService,
    private translate: TranslateService,
    private teacherService: TeacherService,
    private authService: AuthService,
    private notificationService: NbToastrService,
    private chatService : ChatService,
    private router: Router) { }

  async ngOnInit() {
    const lesson_id = this.route.snapshot.params.id;
    this.lesson = await this.lessonService.find(lesson_id).toPromise();
    this.loading = false;
    this.isTeacher = this.authService.currentUserValue.role.slug == "teacher";
    this.isPast = new Date() >= new Date(this.lesson.scheduled_at);
  }

  async acceptStudent(student) {
    await this.teacherService.acceptStudentLesson(student.id, this.lesson.id).toPromise().then(res => {
      this.lesson = res;
      this.notificationService.success(this.translate.instant('lesson.settings.accept_success'), this.translate.instant('shared.success'))
    }).catch(err => {
      this.notificationService.danger(err.error, this.translate.instant('shared.error'))
    });
  }

  confirmLesson() {
    this.paymentLoading = true
    this.lessonService.confirm(this.lesson.id).toPromise().then((res:any) => {
      this.chatService.createRoom({name : `Lesson ${res.scheduled_at}`, users : res.students, lessonId : res.id}).toPromise().then(room => {
        this.chatService.emitNewRoomCreate(room);
        this.lesson = res;
        this.notificationService.success(this.translate.instant('lesson.settings.accept_success'), this.translate.instant('shared.success'))
      });
    }).catch(err => {
      this.notificationService.danger(err.error, this.translate.instant('shared.error'))
    }).finally(() => this.paymentLoading = false);
  }


  async removeStudent() {

  }

  startDispute() {
    this.router.navigate(['/dispute/new/' + this.lesson.id]);
  }

  goToTeacherProfil() {
    this.router.navigate(['/teacher/profile/' + this.lesson.teacher_id]);

  }

  async joinCourse() {

    if (this.lesson.video_link) {
      window.open(this.lesson.video_link, "_blank");
      return;
    }

    this.router.navigate([`/classroom/${this.lesson.id}`]);
    // const user = this.authService.currentUserValue;
    // const config = {
    //   name: user.lastname + " " + user.firstname,
    //   meetingId: this.lesson.id,
    //   apiKey: environment.videoApiKey,

    //   containerId: null,
    //   // redirectOnLeave: 'http://192.168.146:4200',

    //   micEnabled: true,
    //   webcamEnabled: true,
    //   participantCanToggleSelfWebcam: true,
    //   participantCanToggleSelfMic: true,

    //   chatEnabled: true,
    //   screenShareEnabled: true,
    //   pollEnabled: true,
    //   whiteboardEnabled: true,
    //   raiseHandEnabled: true,

    //   recordingEnabled: true,
    //   recordingEnabledByDefault: false,
    //   recordingWebhookUrl: 'https://www.videosdk.live/callback',
    //   // recordingAWSDirPath: `/meeting-recordings/${meetingId}/`, // automatically save recording in this s3 path

    //   brandingEnabled: true,
    //   brandLogoURL: 'https://picsum.photos/200',
    //   brandName: 'ClassMath',

    //   participantCanLeave: true, // if false, leave button won't be visible
    //   joinScreen: {
    //     title: this.translate.instant("this.lesson.subject.libelle"),
    //   },
    //   livestream: {
    //     autoStart: true,
    //     outputs: [
    //       // {
    //       //   url: "rtmp://x.rtmp.youtube.com/live2",
    //       //   streamKey: "<STREAM KEY FROM YOUTUBE>",
    //       // },
    //     ],
    //   },

    //   permissions: {
    //     askToJoin: this.authService.currentUserValue.role.slug != "teacher", // Ask joined participants for entry in meeting
    //     toggleParticipantMic: true, // Can toggle other participant's mic
    //     toggleParticipantWebcam: true, // Can toggle other participant's webcam
    //     removeParticipant: true, // Remove other participant from meeting
    //     endMeeting: true, // End meeting for all participant
    //     drawOnWhiteboard: true, // Can Draw on whiteboard
    //     toggleWhiteboard: true, // Can toggle whiteboard
    //     toggleRecording: true, // Can toggle recording
    //   },

    //   pin: {
    //     allowed: true, // participant can pin any participant in meeting
    //     layout: 'SPOTLIGHT', // meeting layout - GRID | SPOTLIGHT | SIDEBAR
    //   },

    //   leftScreen: {
    //     // visible when redirect on leave not provieded
    //     actionButton: {
    //       // optional action button
    //       label: 'Go to ClassMath', // action button label
    //       href: 'http://192.168.0.146:4200', // action button href
    //     },
    //   },
    //   maxResolution: "hd"
    // };
    // const meeting = new VideoSDKMeeting();
    // meeting.init(config);
  }

  openSettingsModal() {
    const modalRef = this.modalService.create({
      nzContent: LessonSettingsModalComponent,
      nzComponentParams: { lesson: this.lesson },
      nzTitle: "Réglage du cours",
      nzOnOk: (component) => {
        this.lessonService.update(component.lesson).toPromise().then(res => {
          this.lesson = res;
          this.notificationService.success(this.translate.instant('lesson.settings.accept_success'), this.translate.instant('shared.success'))
        }).catch(err => {
          this.notificationService.danger(this.translate.instant("lesson.settings.updated_success"), this.translate.instant('shared.error'));
        })
      }
    })
  }

  openCancelModal() {
    const modalRef = this.modalService.confirm({
      nzContent: this.translate.instant('lesson.cancel.confirm'),
      nzTitle: this.translate.instant('lesson.cancel.title'),
      nzOkText: this.translate.instant('lesson.cancel.ok'),
      nzOnOk: async () => {
        modalRef.updateConfig({
          nzOkLoading: true
        });
        await this.lessonService.cancel(this.lesson.id).toPromise().then(res => {
          this.router.navigate(["/dashboard"]);
          this.modalService.closeAll()
        }).catch(err => {
          modalRef.updateConfig({
            nzOkLoading: false
          });
        });
      }
    })
  }
}
