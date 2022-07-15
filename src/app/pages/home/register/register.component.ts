import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AddressService } from 'src/app/core/services/address.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { debounce, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  activatedRoute: ActivatedRoute;
  step: number = 1
  initGroup: any;
  subscription: Subscription;
  form: any;
  steps: Array<any> = [
    {
      title: 'register.title'
    },
    {
      title: 'register.profil'
    },
    {
      title: 'register.location'
    },
    {
      title: 'register.profil'
    }
  ]
  places;
  place;
  selected = false;
  subjects;
  taught_subject: Array<any> = []
  @ViewChild('placeInput') placeInput;
  avatarUrl: string | ArrayBuffer;
  avatar: any;
  placeInputValue = new Subject();
  currentDate = new Date();


  loading = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NbToastrService,
    private translate: TranslateService,
    private addressService: AddressService,
    private userService: UserService,
    private subjectService: SubjectService,
    private teacherService: TeacherService) { }


  async ngOnInit() {

    this.form = this.fb.group({
      type: ["student", Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      birth: [null, Validators.required],
      password: [null, Validators.required],
      repeat_password: [null, Validators.required],
      sexe: ["m", Validators.required],
      rate: [30],
      currency: ["eur", Validators.required],
      description: [""]

    });
    this.subscription = this.route.params.subscribe(async (params: any) => {
      if (params.step) {
        this.step = params.step;
        this.form.controls.type.value = params.type ?? 'student';
      }
    });
    this.subjects = await this.subjectService.getAll().toPromise();

    this.placeInputValue.pipe(map((word: any) => word.srcElement.value), debounceTime(200), distinctUntilChanged()).subscribe(async (keyword) => {
      this.places = await this.addressService.findPlaces(keyword);
      this.selected = false;
    })
  }

  select(type = 'student') {
    this.form.controls.type.value = type;
  }

  nextStep() {
    if (this.step == 2)
      this.submit();
    if (this.step == 3)
      this.attachPlace()
    if (this.step == 4)
      this.completeTeacherProfil()
    if (this.step < 2) {
      this.step++;
      this.router.navigate([`.`, { step: this.step, type: this.type.value }], { relativeTo: this.route });
    }
  }

  async submit() {

    const user = this.form.value;
    this.loading = true;
    await this.authService.addUser(user).toPromise().then(success => {
      this.authService.setAuth(success);
      this.step++
      this.notificationService.primary(this.translate.instant('register.success.desc'), this.translate.instant('register.success.title'))
      this.router.navigate([`.`, { step: this.step, type: this.type.value }], { relativeTo: this.route });
    })
      .catch(err => {
        for (const [key, value] of Object.entries(err.error)) {
          this.notificationService.danger(this.translate.instant('register.error.desc'), value)
        }
      })
    this.loading = false;
  }

  async findPlaces(keyword) {
    this.placeInputValue.next(keyword);
  }


  onSelectionChange(place) {
    this.selected = true;
    this.place = place;
    this.placeInput.nativeElement.value = `${place.place_name}`

  }

  async attachPlace() {
    const obj = {
      address: this.place.name,
      lat: this.place.coordinate.latitude,
      lng: this.place.coordinate.longitude,
      country: this.place.country,
      city: this.place.structuredAddress.locality,
      local: this.place.structuredAddress.thoroughfare,
      postcode: "00000",
    }
    this.loading = true;
    await this.addressService.attach(obj).toPromise().then(async (res: any) => {
      if (res.role.slug == 'student') {
        this.router.navigate(['student/dashboard']);
      } else {
        this.step = 4
        this.router.navigate([`.`, { step: this.step, type: this.type.value }], { relativeTo: this.route });
      }
    })
    this.loading = false;
  }

  beforeUpload = (file) => {
    this.avatar = file;
    this.getAvatarBlob(file)
    return false;
  }

  getAvatarBlob(file): any {
    var reader = new FileReader();
    reader.onloadend = () => { this.avatarUrl = reader.result }
    reader.readAsDataURL(file)
  }

  checkSubject(event, subject) {
    if (subject.checked) {
      subject.checked = false
      this.taught_subject = this.taught_subject.filter((val) => val != subject.id);
    } else {
      subject.checked = true;
      this.taught_subject.push(subject.id);
    }
  }

  async completeTeacherProfil() {
    const obj = {
      subjects: this.subjects.filter(el => this.taught_subject.includes(el.id)),
      description: this.form.controls.description.value,
      rate: this.form.controls.rate.value,
      currency: this.form.controls.currency.value
    }
    this.loading = true;
    await this.teacherService.attachProfile(obj).toPromise().then(async res => {
      const formData = new FormData();
      formData.append('avatar', this.avatar);
      await this.userService.setAvatar(formData).toPromise()
      this.router.navigate(['teacher/dashboard']);
    }
    ).catch(err => {
      for (const [key, value] of Object.entries(err.error)) {
        this.notificationService.danger(this.translate.instant('register.error.desc'), value)
      }
    });
    this.loading = false;

  }

  get type() {
    return this.form.get('type');
  }


}
