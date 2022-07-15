import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { environment } from '../../../../environments/environment';
import { SubjectService } from 'src/app/core/services/subject.service';
import { AddressService } from 'src/app/core/services/address.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {
  subscription;
  filters = {
    subject_id: null,
    lat: null,
    lng: null,
    date : null,
  };
  data;
  environement = environment;
  subjects;
  places;
  place;
  @ViewChild('placeInput') placeInput;

  placeInputValue = new Subject();


  constructor(private route: ActivatedRoute,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private addressService: AddressService,
    private router: Router) { }

  async ngOnInit() {
    this.subscription = this.route.params.subscribe(async (params: any) => {
      if (params.subject_id) {
        this.filters.subject_id = params.subject_id;
      }
      this.data = await this.teacherService.search(this.filters).toPromise();
    });
    this.subjects = await this.subjectService.getAll().toPromise();
    this.placeInputValue.pipe(map((word: any) => word.srcElement.value), debounceTime(200), distinctUntilChanged()).subscribe(async (keyword) => {
      this.places = await this.addressService.findPlaces(keyword).toPromise();
    })
  }


  async findPlaces(keyword) {
    this.placeInputValue.next(keyword);
  }


  async onSelectionChange(place) {
    this.place = place;
    this.placeInput.nativeElement.value = `${place.name}, ${place.country}`
    this.filters.lat = place.coordinate.latitude;
    this.filters.lng = place.coordinate.longitude;
    this.data = await this.teacherService.search(this.filters).toPromise();
  }




  async selectedSubjectsChange(value, subj) {
    this.subjects = this.subjects.map(sub => { sub.selected = false; return sub })
    subj.selected = value;
    this.filters.subject_id = subj.selected ? subj.id : null;
    this.data = await this.teacherService.search(this.filters).toPromise();
  }


  openTeacherProfile(teacher_id) {
    this.router.navigate([`teacher/profile/${teacher_id}`, { subject_id: this.filters.subject_id }]);
  }

  async onDateSelectionChange(date){
    if(date instanceof InputEvent){
      this.filters.date = null;
    }else{
      this.filters.date = date;
    }
    this.data = await this.teacherService.search(this.filters).toPromise();
  }
}
