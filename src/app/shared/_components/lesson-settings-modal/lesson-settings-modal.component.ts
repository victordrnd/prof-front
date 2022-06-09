import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson-settings-modal',
  templateUrl: './lesson-settings-modal.component.html',
  styleUrls: ['./lesson-settings-modal.component.scss']
})
export class LessonSettingsModalComponent implements OnInit {

  lesson;
  isCollectif = false;
  constructor() { }

  ngOnInit(): void {
    this.isCollectif = this.lesson.capacity != 1;
  }


  formatToolTip = (evt) => {
    return evt +" élèves"
  }
}
