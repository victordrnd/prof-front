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
  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NbToastrService,
    private translate: TranslateService,
    private addressService: AddressService,
    private subjectService: SubjectService,
    private teacherService: TeacherService) { }


  async ngOnInit() {
    this.form = this.fb.group({
      type: ["student", Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      repeat_password: [null, Validators.required],
      sexe: ["m", Validators.required],
      rate: [30],
      currency : ["eur", Validators.required],
      description: [""]

    });
    this.subscription = this.route.params.subscribe(async (params: any) => {
      if (params.step) {
        this.step = params.step;
        this.form.controls.type.value = params.type ?? 'student';
      }
    });
    this.subjects = await this.subjectService.getAll().toPromise();

    this.placeInputValue.pipe(map((word : any) => word.srcElement.value), debounceTime(400), distinctUntilChanged()).subscribe(async (keyword) => {
      this.places = await this.addressService.findPlaces(keyword).toPromise();
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
    const user = this.form.value
    await this.authService.addUser(user).toPromise().then(success => {
      this.authService.setAuth(success);
      this.step++
      this.notificationService.success(this.translate.instant('register.success.desc'), this.translate.instant('register.success.title'))
      this.router.navigate([`.`, { step: this.step, type: this.type.value }], { relativeTo: this.route });
    })
      .catch(err => {
        for (const [key, value] of Object.entries(err.error)) {
          this.notificationService.danger(this.translate.instant('register.error.desc'), value)
        }
      })
  }

 
  async findPlaces(keyword) {
      this.placeInputValue.next(keyword);
  }


  onSelectionChange(place) {
    this.selected = true;
    this.place = place;
    this.placeInput.nativeElement.value = `${place.place_name}`
    console.log(place);
  }

  async attachPlace() {
    const obj = {
      address: this.place.place_name,
      lat: this.place.center[0],
      lng: this.place.center[1],
      country: this.place.context.find(el => el.id.includes("country"))?.text,
      city: this.place.context.find(el => el.id.includes("place"))?.text,
      local: this.place.context.find(el => el.id.includes("region"))?.text,
      postcode: this.place.context.find(el => el.id.includes("postcode"))?.text,
    }
    await this.addressService.attach(obj).toPromise().then(async (res: any) => {
      if (res.role.slug == 'student') {
        this.router.navigate(['student/dashboard']);
      } else {
        this.step = 4
        this.router.navigate([`.`, { step: this.step, type: this.type.value }], { relativeTo: this.route });
      }
    })
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

  completeTeacherProfil() {
    const obj = {
      subjects: this.taught_subject,
      description: this.form.controls.description.value,
      rate: this.form.controls.rate.value
    }
    this.teacherService.attachProfile(obj).toPromise().then(async res => {
      const formData = new FormData();
      formData.append('avatar', this.avatar);
      await this.teacherService.uploadAvatar(formData).toPromise()
      this.router.navigate(['teacher/dashboard']);
    }
    ).catch(err => console.log(err))
  }

  get type() {
    return this.form.get('type');
  }

}
