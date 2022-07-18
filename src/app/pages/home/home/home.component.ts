import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/core/services/subject.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subjects: Object;
  keyword:any;
  subject : any = [];
  constructor(private router : Router,
    private subjectService : SubjectService,
    private teacherService : TeacherService,
    private translate : TranslateService) { }

  async ngOnInit() {
    this.subjects = await this.subjectService.getAll().toPromise();
  }

  registerTeacher(){
    this.router.navigate([`register`, { step : 1, type : 'teacher' }]);
  }


  async search(){
    // let teachers =  await this.teacherService.search(this.subject.id).toPromise();
    if(this.subject.id){
      this.router.navigate(['search', {subject_id : this.subject.id}]);
    }else{
      this.router.navigate(['search']);
    }

  }

  setSelected(ev){
    if(ev){
      if(ev.libelle){
        this.keyword = this.translate.instant(ev.libelle)
        this.subject = ev;
      }
    }
  }
}
