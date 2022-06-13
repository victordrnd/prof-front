import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../../../../environments/environment';
import { ReviewService } from 'src/app/core/services/review.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  constructor(private teacherService : TeacherService,
    private route : ActivatedRoute,
    private reviewService : ReviewService,
    private translate : TranslateService,
    private notificationService : NbToastrService) { }
  teacher;
  environement = environment;

  new_comment = {
    note : 5,
    comment : null
  }

  canWriteReview = false;

  
  ngOnInit() {
    this.route.params.subscribe(async value => {
      this.teacher = await this.teacherService.get(value.id).toPromise()
      try{
        this.canWriteReview = await this.reviewService.can(this.teacher.id).toPromise() == "1";
      }catch(e){
        this.canWriteReview = false;
      }
    });
  }


  sendReview(){
    this.reviewService.create({...this.new_comment, to : this.teacher.id}).toPromise().then(async res => {
      this.new_comment.note = 5;
      this.new_comment.comment = null;
      this.notificationService.success(this.translate.instant('settings.success_description'), this.translate.instant('shared.success'));
      this.teacher = await this.teacherService.get(this.teacher.id).toPromise();
    }).catch(err => {
      this.notificationService.danger(this.translate.instant("shared.error_description"), this.translate.instant('shared.error'))
    }) 
  }
}
