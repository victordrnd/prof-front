import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-disputes-list',
  templateUrl: './disputes-list.component.html',
  styleUrls: ['./disputes-list.component.scss']
})
export class DisputesListComponent implements OnInit {

  disputes;
  loading = true;
  constructor(private adminService : AdminService,
    private router : Router) { }

  ngOnInit(): void {
    this.getDisputes();
  }

  async getDisputes(){
    this.loading = true;
    this.disputes = await this.adminService.getDisputes().toPromise();
    this.loading = false;
  }


  openDispute(dispute_id){
    this.router.navigate([`/admin/disputes/${dispute_id}`]);
  }
}
