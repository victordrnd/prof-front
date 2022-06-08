import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LessonService } from 'src/app/core/services/lesson.service';

@Component({
  selector: 'app-lesson-details',
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss']
})
export class LessonDetailsComponent implements OnInit {
  lesson
  loading = true;
  constructor(private route : ActivatedRoute,
    private lessonService : LessonService,
    private modalService : NzModalService,
    private translate : TranslateService,
    private router : Router) { }

  async ngOnInit() {
    const lesson_id = this.route.snapshot.params.id;
    this.lesson = await this.lessonService.find(lesson_id).toPromise();
    this.loading = false;
  }

  joinCourse(){

  }

  openCancelModal(){
    const modalRef = this.modalService.confirm({
      nzContent : this.translate.instant('lesson.cancel.confirm'),
      nzTitle : this.translate.instant('lesson.cancel.title'),
      nzOkText : this.translate.instant('lesson.cancel.ok'),
      nzOnOk : async () => {
        modalRef.updateConfig({
          nzOkLoading : true
        });
        await this.lessonService.cancel(this.lesson.id).toPromise();
        this.router.navigate(["/dashboard"]);
        this.modalService.closeAll()
      }
    })
  }
}
