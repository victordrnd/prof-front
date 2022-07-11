import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-edit-subject-modal',
  templateUrl: './edit-subject-modal.component.html',
  styleUrls: ['./edit-subject-modal.component.scss']
})
export class EditSubjectModalComponent implements OnInit {

  InputData;
  form: FormGroup;
  loading;

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private notificationService: NbToastrService,
    private modalRef : NzModalRef,
    private translate : TranslateService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      color: [null, [Validators.required]]
    })
  }

  async submit(id) {
    const subject = this.form.value;
    this.loading = true;
    await this.adminService.editSubject(id, subject).toPromise().then(success => {

      this.notificationService.success("succès", "bien enregistré");
      this.modalRef.close();

    })
      .catch(err => {

        this.notificationService.danger("echec", "echec");

      })
    this.loading = false;
  }

}
