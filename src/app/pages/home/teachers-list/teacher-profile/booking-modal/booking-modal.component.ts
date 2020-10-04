import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { LessonService } from '../../../../../core/services/lesson.service';
import { Router } from '@angular/router';

@Component({
  selector: 'teacher-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
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
