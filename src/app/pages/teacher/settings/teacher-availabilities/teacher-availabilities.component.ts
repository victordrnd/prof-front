import { Component, OnInit } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'app-teacher-availabilities',
  templateUrl: './teacher-availabilities.component.html',
  styleUrls: ['./teacher-availabilities.component.scss']
})
export class TeacherAvailabilitiesComponent implements OnInit {

  col=10
  col2 = 2
  id = -1;
  constructor() { }

  ngOnInit(): void {
  }


  onResize({ col }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.col = col!;
    });
  }

  onResize2({ col }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.col = col!;
    });
  }
}
