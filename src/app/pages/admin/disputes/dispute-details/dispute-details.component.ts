import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AdminService } from 'src/app/core/services/admin.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dispute-details',
  templateUrl: './dispute-details.component.html',
  styleUrls: ['./dispute-details.component.scss']
})
export class DisputeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private authService : AuthService,
    private notificationService : NbToastrService,
    private adminService: AdminService) { }

  dispute;
  messages = [];
  user;
  async ngOnInit() {
    this.user = this.authService.currentUserValue;
    const id = this.route.snapshot.params.id;
    await this.getDispute(id);
    this.messages.push({
      text: this.dispute.description,
      date: new Date(),
      reply: false,
      type: 'text',
      user: {
        name: this.dispute.user.lastname + ' '+ this.dispute.user.firstname,
        avatar: this.dispute.user.image,
      },
    })
    console.log(this.dispute);
  }


  async getDispute(dispute_id){
    this.dispute = await this.adminService.getDispute(dispute_id).toPromise();
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: this.user.lastname + ' '+ this.user.firstname,
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }


  confirmRefund(student){
    console.log(student);
    this.adminService.proceedRefund(student.id, this.dispute.lesson.id).toPromise().then(res => {
      this.notificationService.success("Le remboursement a correctement été effectué", "Succès");
      this.getDispute(this.dispute.id);
    }).catch(err => {
      this.notificationService.danger("Impossible de procéder au remboursement de cet étudiant", "Error");
    });
  }
}
