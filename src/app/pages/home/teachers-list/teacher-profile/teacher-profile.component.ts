import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  constructor(private teacherService : TeacherService,
    private route : ActivatedRoute) { }
  teacher;
  environement = environment;

  
  ngOnInit() {
    this.route.params.subscribe(async value => {
      this.teacher = await this.teacherService.get(value.id).toPromise()
    });
  }

}
