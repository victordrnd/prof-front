import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subjects-modal',
  templateUrl: './add-subjects-modal.component.html',
  styleUrls: ['./add-subjects-modal.component.scss']
})
export class AddSubjectsModalComponent implements OnInit {

  constructor() { }

  subjects;
  taught_subjects;
  ngOnInit(): void {
    
    this.taught_subjects = this.subjects.filter(el => el.taught).map(el => el.id);
  }


}
