import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartConfiguration, ChartData } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, BaseChartDirective } from 'ng2-charts';
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

  ageAvairage;

  constructor(private userService :  UserService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  async ngOnInit() {
    this.loading = true;
    this.stats = await this.userService.getStats().toPromise();

    this.kindUserData=[this.stats['usersCount']['validatedTeachersCount'], this.stats['usersCount']['studentsCount']];
    this.isTeacherValidatedData=[this.stats['usersCount']['validatedTeachersCount'], this.stats['usersCount']['unvalidatedTeacherCount']];
    this.TeacherSubjectsLabels=this.stats['allSubject'];
    this.TeacherSubjectsData=this.stats['subjectStudiedCount'];
    this.disputesStatusData=[this.stats['disputesStatusCount']['opened'], this.stats['disputesStatusCount']['closed']];

    this.ageAvairage = this.stats['averageAge'];

    this.loading = false;
  }

}
