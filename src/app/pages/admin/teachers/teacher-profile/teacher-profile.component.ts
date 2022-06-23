import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'admin-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {
  loading = true;
  teacher
  constructor(private route: ActivatedRoute,
    private notificationService: NbToastrService,
    private adminService: AdminService) { }


  async ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.teacher = await this.adminService.showTeacher(id).toPromise();
    this.loading = false;
  }


  openFile(diploma) {
    window.open(diploma.link, "_blank");
  }

  async updateDiplomaStatus(diploma, status) {
    await this.adminService.updateDiplomaStatus(diploma.id, status).toPromise().then(res => {
      this.teacher = res;
      this.notificationService.success("Le diploma a correctement été validé", "Succès");
    }).catch(err => this.notificationService.danger("An error has occured", "Error"));
  }

  approve(evt) {
    if (this.canApprove()) {
      this.adminService.approveTeacher(this.teacher.id, evt).toPromise().then(res => {
        this.teacher = res;
        this.notificationService.success("La visibilité du professeur a été mis à jour", "Succès");
      }).catch(err => this.notificationService.danger("An error has occured", "Error"));
    }
  }

  canApprove() {
    const allDiplomasValidated = this.teacher.diplomas.length > 0 && this.teacher.diplomas.every(diploma => diploma.status.code != "waiting" || diploma.status.code != "refused")
    return this.teacher.account?.details_submitted && allDiplomasValidated && this.teacher.is_verified;
  }
}
