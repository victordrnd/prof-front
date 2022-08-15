import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AdminService } from 'src/app/core/services/admin.service';
import { AdminModule } from '../admin.module';

@Component({
  selector: 'app-subject-modal',
  templateUrl: './subject-modal.component.html',
  styleUrls: ['./subject-modal.component.scss']
})
export class SubjectModalComponent implements OnInit {

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
      libelle: [null, Validators.required],
      slug: [null, Validators.required],
      color: [null, [Validators.required]]
    })
  }

  async submit() {
    const subject = this.form.value;
    this.loading = true;
    await this.adminService.addSubject(subject).toPromise().then(success => {

      this.notificationService.success("succès", "bien enregistré");
      this.modalRef.close();

    })
      .catch(err => {
        if (err.error) {
          this.notificationService.danger(err.error.errors[Object.keys(err.error.errors)[0]], this.translate.instant('shared.error'))
        } else {
          for (const [key, value] of Object.entries(err)) {
            this.notificationService.danger(this.translate.instant('register.error.desc'), value)
          }
        }

      })
    this.loading = false;
  }

}
