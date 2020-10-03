import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { environment } from '../../../../environments/environment';
import { SubjectService } from 'src/app/core/services/subject.service';
import { AddressService } from 'src/app/core/services/address.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {
  subscription;
  searchable = {
    subject_id : null
  };
  data;
  environement = environment;
  subjects;
  places;
  place;
  @ViewChild('placeInput') placeInput;

  constructor(private route : ActivatedRoute,
    private teacherService : TeacherService,
    private subjectService : SubjectService,
    private addressService : AddressService) { }

  async ngOnInit() {
    this.subscription = this.route.params.subscribe(async (params: any) => {
      if (params.subject_id) {
        this.searchable.subject_id = params.subject_id;
        this.data = await this.teacherService.search(this.searchable.subject_id).toPromise();
      }
    });
    this.subjects = await this.subjectService.getAll().toPromise();

  }


  async findPlaces(keyword) {
    if (keyword.srcElement.value.length % 3 == 0) {
      // this.selected = false;
      await this.addressService.findPlaces(keyword.srcElement.value).toPromise().then((res: any) => this.places = res.hits);
    }
  }
  onSelectionChange(place) {
    // this.selected = true;
    this.place = place;
    this.placeInput.nativeElement.value = `${place.locale_names.default[0]} ${place.country?.default}, ${place.city?.default[0]}`
    console.log(place);
  }



  selectedSubjectsChange(value, subj){
    console.log(value, subj);
    subj.selected = value;
    console.log(this.subjects)
  }
}
