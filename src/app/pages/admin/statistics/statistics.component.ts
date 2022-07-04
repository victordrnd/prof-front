import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  stats;
  loading;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public kindUserLabels: Label[] = ['Validated teacher', 'Students'];
  public kindUserData: SingleDataSet;

  public isTeacherValidatedLabels: Label[] = ['Validated teacher', 'Teacher unvalidated yet'];
  public isTeacherValidatedData: SingleDataSet;

  public TeacherSubjectsLabels: Label;
  public TeacherSubjectsData: SingleDataSet;

  public disputesStatusLabels: Label[] = ['Opened disputes', 'Closed disputes'];
  public disputesStatusData: SingleDataSet;

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private userService :  UserService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  async ngOnInit() {
    this.loading = true;
    this.stats = await this.userService.getStats().toPromise();

    this.kindUserData=[this.stats['teacherCount'], this.stats['studentCount']];
    this.isTeacherValidatedData=[this.stats['teacherCount'], this.stats['unvalidatedTeacherCount']];
    this.TeacherSubjectsLabels=this.stats['allSubject'];
    this.TeacherSubjectsData=this.stats['subjectStudiedCount'];
    this.disputesStatusData=[this.stats['DisputesStatusCount']['opened'], this.stats['DisputesStatusCount']['closed']];

    this.loading = false;
  }

}
