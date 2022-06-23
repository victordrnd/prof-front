import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  teachers;
  filters = {
    page : 1,
    keyword : null,
    validated : null
  }
  loading;
  constructor(private adminService : AdminService,
    private router : Router) { }

  async ngOnInit() {
    this.getTeachers();
  }
  
  async getTeachers(key = null, value = null){
    if(key){
      this.filters[key] = value;
      this.filters.page = 1;
    }
    this.loading = true;
    this.teachers = await this.adminService.searchTeachers(this.filters).toPromise();
    this.filters.page = this.teachers.page;
    this.loading = false;
  }


  openProfil(teacher_id){
    this.router.navigate(['/admin/teachers/'+teacher_id]);
  }


  onPageIndexChange(page){
    this.filters.page = page;
    this.getTeachers();
  }
}
