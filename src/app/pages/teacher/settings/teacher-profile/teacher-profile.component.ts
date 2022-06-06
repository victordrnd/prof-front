import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubjectService } from 'src/app/core/services/subject.service';
import { AddSubjectsModalComponent } from '../_components/add-subjects-modal/add-subjects-modal.component';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  constructor(private subjectService: SubjectService,
    private modalService: NzModalService,
    private notificationService : NbToastrService,
    private translate : TranslateService) { }

  teached_subjects: any[] = [];
  subjects;
  async ngOnInit() {

    this.teached_subjects = await this.subjectService.getMyTeachedSubjects().toPromise() as any;
    this.subjects = await this.subjectService.getAll().toPromise();
    this.subjects = this.subjects.map(subject => {
      if (this.teached_subjects.map(el => el.subject.id).includes(subject.id)) {
        subject.taught = true;
      } else {
        subject.taught = false;
      }
      return subject;
    })
  }


  openAddSubjectsModal() {
    const modalRef = this.modalService.create({
      nzContent: AddSubjectsModalComponent,
      nzComponentParams: { subjects: this.subjects.filter(el => !this.teached_subjects.map(subject => subject.subject.id).includes(el.id)) },
      nzClosable: true,
      nzMaskClosable: false,
      nzOnOk: (component) => {
        modalRef.updateConfig({
          nzOkLoading: true
        });

        component.taught_subjects.forEach(subject_id => {
          const subject = this.subjects.find(subject => subject.id == subject_id);
          if (!subject.taught) {
            this.teached_subjects.push({ description: "", subject: subject });
          }
        });
      }
    })
  }



  saveSubjects() {
    const subjects = this.teached_subjects.map(subject => {
      subject.id = subject.subject.id;
      return subject;
    })

    this.subjectService.updateMyTeachedSubjects(subjects).toPromise().then(res => {
      this.notificationService.success(this.translate.instant("settings.success_description"), this.translate.instant('shared.success'))
    }).catch(err => {
      this.notificationService.success(this.translate.instant("shared.error_description"), this.translate.instant('shared.error'))
    }) ;
  }
}
