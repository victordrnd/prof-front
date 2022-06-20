import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { CalendarService } from 'src/app/core/services/calendar.service';

@Component({
  selector: 'app-teacher-availabilities',
  templateUrl: './teacher-availabilities.component.html',
  styleUrls: ['./teacher-availabilities.component.scss']
})
export class TeacherAvailabilitiesComponent implements OnInit {

  constructor(private calendarService : CalendarService,
    private translate : TranslateService,
    private notificationService : NbToastrService) { }

  availabilities;
  async ngOnInit() {
    this.availabilities = await this.calendarService.getMyAvailabilities().toPromise();
    // this.availabilities = 
  }


  toggleEnabled(schedule){
    schedule.disabled = !schedule.disabled;
  }



  saveAvailabilities(){
    console.log(this.availabilities.days);
    this.calendarService.saveAvailabilities(this.availabilities.days).toPromise().then(res => {
      this.notificationService.success(this.translate.instant("settings.success_description"), this.translate.instant('shared.success'))
    }).catch(err => {
      this.notificationService.danger(this.translate.instant("shared.error_description"), this.translate.instant('shared.error'))
    });
  }
}
