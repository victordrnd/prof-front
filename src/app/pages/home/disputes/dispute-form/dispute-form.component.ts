import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { DisputeService } from 'src/app/core/services/dispute.service';
import { LessonService } from 'src/app/core/services/lesson.service';

@Component({
  selector: 'app-dispute-form',
  templateUrl: './dispute-form.component.html',
  styleUrls: ['./dispute-form.component.scss']
})
export class DisputeFormComponent implements OnInit {
  lesson
  constructor(private activatedRoute: ActivatedRoute,
    private lessonService: LessonService,
    private disputeService: DisputeService,
    private notificationService: NbToastrService,
    private chatService: ChatService,
    private userSerivce: AuthService,
    private translate: TranslateService) { }

  dispute = {
    title: null,
    reason: null,
    description: null,
    lesson_id: null,
    room_id: null
  };

  async ngOnInit() {
    const lesson_id = this.activatedRoute.snapshot.params.id;
    this.initDispute(lesson_id);
    this.lesson = await this.lessonService.find(lesson_id).toPromise();
  }


  async createDispute() {
    this.chatService.createRoom({ name: "Dispute : " + this.dispute.title, withAdmin: true, users: [] }).toPromise().then(async (res: any) => {
      this.dispute.room_id = res.id;
      await this.disputeService.create(this.dispute).toPromise().then((res: any) => {
        this.chatService.sendMessage({
          type: "text",
          userId: res.user_id,
          roomId: this.dispute.room_id,
          content: res.description
        }, true);
        this.notificationService.primary(this.translate.instant("dispute.submitted_success"), this.translate.instant('shared.success'));
        this.initDispute(this.lesson.id);
      }).catch(err => {
        this.notificationService.danger(this.translate.instant("shared.error_description"), this.translate.instant('shared.error'))
      });
    })
  }


  initDispute(lesson_id) {
    this.dispute = {
      title: null,
      reason: null,
      description: null,
      lesson_id: lesson_id,
      room_id: null
    };
  }

}
