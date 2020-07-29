import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subjects: Object;

  constructor(private router : Router,
    private subjectService : SubjectService) { }

  async ngOnInit() {
    this.subjects = await this.subjectService.getAll().toPromise();
  }

  registerTeacher(){
    this.router.navigate([`register`, { step : 1, type : 'teacher' }]);
  }

}
