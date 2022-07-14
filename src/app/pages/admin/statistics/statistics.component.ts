import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartType, ChartOptions, ChartConfiguration, ChartData } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, BaseChartDirective, Color } from 'ng2-charts';
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
  public kindUserLabels: Label[];
  public kindUserData: SingleDataSet;

  public isTeacherValidatedLabels: Label[];
  public isTeacherValidatedData: SingleDataSet;

  public TeacherSubjectsLabels: Label;
  public TeacherSubjectsData: SingleDataSet;

  public disputesStatusLabels: Label[];
  public disputesStatusData: SingleDataSet;

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieColor: Color[] = [
    {
      backgroundColor: [
        "#92d3cc",
        '#1d4944'
      ]
    }
 ]

 public pieColorSubject: Color[] = [
  {
    backgroundColor: []
  }
]

  public pieChartPlugins = [];

  ageAvairage;

  constructor(private userService: UserService,
    private translate: TranslateService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  async ngOnInit() {

    this.loading = true;

    this.stats = await this.userService.getStats().toPromise();
    this.kindUserLabels = [this.translate.instant('admin.stats.teachervalid'), this.translate.instant('admin.stats.student')];
    this.kindUserData = [this.stats.usersCount.validatedTeachersCount, this.stats.usersCount.studentsCount];
    this.isTeacherValidatedLabels = [this.translate.instant('admin.stats.teachervalid'), this.translate.instant('admin.stats.teacherunvalid')];
    this.isTeacherValidatedData = [this.stats.usersCount.validatedTeachersCount, this.stats.usersCount.unvalidatedTeacherCount];
    const transaletedList = this.stats.allSubjects.libelle.map(x=> this.translate.instant(x))
    this.TeacherSubjectsLabels = transaletedList;
    this.pieColorSubject[0].backgroundColor = this.stats.allSubjects.color;
    this.TeacherSubjectsData = this.stats.subjectsStudiedCount;
    this.disputesStatusLabels = [this.translate.instant('admin.stats.disputescl'), this.translate.instant('admin.stats.disputesop')];
    this.disputesStatusData = [this.stats.disputesStatusCount.closed, this.stats.disputesStatusCount.opened];
    this.ageAvairage = this.stats.averageAge;

    this.loading = false;
  }

}
