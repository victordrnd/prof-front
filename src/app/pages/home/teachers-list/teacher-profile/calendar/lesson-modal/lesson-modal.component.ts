import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { TeachersListComponent } from '../../../teachers-list.component';
import { LessonService } from 'src/app/core/services/lesson.service';
import { createInject } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-modal',
  templateUrl: './lesson-modal.component.html',
  styleUrls: ['./lesson-modal.component.scss']
})
export class LessonModalComponent implements OnInit {
  item;
  date;
  teacher;
  selectedSubject;
  selectedDuration = 1
  maxDuration;
  constructor(private modalService : NzModalService,
    private lessonService : LessonService,
    private router : Router) { }

  ngOnInit() {
    this.selectedSubject = this.teacher.teacher_subject[0].subject.id;
    console.log(this.date, this.item);
  }


  counter(i: number) {
    let arr = [];
    for(let j =1; j <=i;j++){
      arr.push(j);
    }
    return arr;
  }


  async confirm(){
    const obj = {
      subject_id : this.selectedSubject,
      duration : this.selectedDuration,
      teacher_id : this.teacher.id,
      scheduled_at : this.date.detail +" "+ this.item.time+":00"
    }
    try{
      await this.lessonService.store(obj).toPromise();
      this.modalService.closeAll();
      this.router.navigate(['student/dashboard']);
    }catch(e){
      console.error(e)
    }
  }


  cancel(){
    this.modalService.closeAll();
  }
}
