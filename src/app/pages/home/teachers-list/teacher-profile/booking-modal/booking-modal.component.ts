import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LessonService } from '../../../../../core/services/lesson.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/core/services/payment.service';
import { AddPaymentComponent } from 'src/app/pages/student/settings/payment/add-payment/add-payment.component';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService } from '@nebular/theme';
import { AddressService } from 'src/app/core/services/address.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'teacher-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
  item;
  date;
  teacher;
  selectedSubject;
  selectedDuration = 1
  maxDuration;
  subject_id = null;

  at_home = false;
  places: any = [];
  place = null;
  @ViewChild('placeInput') placeInput;
  placeInputValue = new Subject();
  selectedPlace;

  address = null;
  constructor(private modalService: NzModalService,
    private lessonService: LessonService,
    private addressService: AddressService,
    private translate: TranslateService,
    private notificationService: NbToastrService,
    private router: Router) { }

  ngOnInit() {
    if (this.teacher.teacher_subjects.length) {
      if (this.subject_id && this.subject_id != "null") {
        this.selectedSubject = this.teacher.teacher_subjects.find(el => el.subject.id == this.subject_id).id;
      } else {
        this.selectedSubject = this.teacher.teacher_subjects[0].subject.id;
      }
    }
    this.placeInputValue.pipe(map((word: any) => word.srcElement.value), debounceTime(200), distinctUntilChanged()).subscribe(async (keyword) => {
      if (keyword) {
        this.places = await this.addressService.findPlaces(keyword);;
      }
    })
  }



  async findPlaces(keyword) {
    this.placeInputValue.next(keyword);
  }


  counter(i: number) {
    let arr = [];
    for (let j = 1; j <= i; j++) {
      arr.push(j);
    }
    return arr;
  }

  async selectPlace(item){
    const details = await this.addressService.getPlaceDetails(item.completionUrl);
  
    this.place = item.displayLines.join(' ');
    
    this.placeInput.nativeElement.innerHtml = this.place;
    this.selectedPlace = details;
  }

  async confirm() {
    const place = this.selectedPlace;
    let obj = {
      subject_id: this.selectedSubject,
      duration: this.selectedDuration,
      teacher_id: this.teacher.id,
      scheduled_at: this.date.date.full + " " + this.item.time + ":00",
      at_home: this.at_home,
    }
    if (place) {
      let address = {
        address: this.place,
        lat: place.center.lat,
        lng: place.center.lng,
        country: place.country,
        city: place.locality,
        local: place.thoroughfare,
        postcode: "00000",
      }
      obj = { ...obj, ...address };
    }
    await this.lessonService.store(obj).toPromise().then(res => {
      this.modalService.closeAll();
      this.router.navigate(['student/dashboard']);
      this.notificationService.primary(this.translate.instant('lesson.success_description'), this.translate.instant('shared.success'));
    }).catch(err => {
      if (err.status == 409) {
        const modalref = this.modalService.create({
          nzContent: AddPaymentComponent,
          nzTitle: this.translate.instant('payment.add'),
          nzFooter: null
        });
        modalref.afterClose.subscribe(() => {
          if (modalref.componentInstance.success) {
            this.confirm();
          }
        })
      } else if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.notificationService.danger(err.error.error, this.translate.instant('shared.error'));
      }
    });
  }


  cancel() {
    this.modalService.closeAll();
  }


  checkDisabled() {
    return this.at_home && !this.selectedPlace
  }
}
