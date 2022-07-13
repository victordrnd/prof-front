import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  students;
  filters = {
    page : 1,
    keyword : null,
    validated : null
  }
  loading;

  constructor(private adminService : AdminService,
              private translate : TranslateService,
              private router : Router
              )
  { }

  ngOnInit() {
    this.getStudents();
  }

  async getStudents(key = null, value = null){
    if(key){
      this.filters[key] = value;
      this.filters.page = 1;
    }
    this.loading = true;
    this.students = await this.adminService.searchStudents(this.filters).toPromise();
    this.filters.page = this.students.page;
    this.loading = false;
  }

  openProfil(student_id){
    this.router.navigate(['/admin/students/'+student_id]);
  }

  async IndexChange(page) {
    this.getStudents('page', page);
  }

}
