import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubjectModalComponent } from '../subject-modal/subject-modal.component';
import { EditSubjectModalComponent } from '../edit-subject-modal/edit-subject-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects;
  loading;

  constructor(private adminService : AdminService,
              private modalService: NzModalService,
              private translate : TranslateService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  async getSubjects(){
    this.loading = true;
    this.subjects = await this.adminService.getSubjects().toPromise();
    this.loading = false;
  }

  async addSubject(){
    const modalRef = this.modalService.create({
      nzContent: SubjectModalComponent,
      nzTitle: this.translate.instant('admin.subject.create'),
      nzCancelText : this.translate.instant('admin.subject.cancel'),
    })
    modalRef.afterClose.subscribe(async () => {
      await this.getSubjects();
    })
  }

  async editSubject(subject){
    const modalRef = this.modalService.create({
      nzContent: EditSubjectModalComponent,
      nzTitle: this.translate.instant('admin.subject.updatetitle') + this.translate.instant(subject.libelle),
      nzCancelText : this.translate.instant('admin.subject.cancel'),
      nzComponentParams: {
        InputData: subject
    }

    })
    modalRef.afterClose.subscribe(async () => {
      await this.getSubjects();
    })
  }

}
