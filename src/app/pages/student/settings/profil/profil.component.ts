import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AddressService } from 'src/app/core/services/address.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private addressService: AddressService,
    private notificationService: NbToastrService,
    private translate: TranslateService) { }
  form;
  places;
  selected = false;
  @ViewChild('placeInput') placeInput;
  placeInputValue = new Subject();
  avatarUrl: string | ArrayBuffer;
  avatar: any;
  place;

  oldAddress: any;

  async ngOnInit() {
    const user = this.authService.currentUserValue;
    this.avatarUrl = user.image;
    this.form = this.fb.group({
      firstname: [user.firstname, Validators.required],
      lastname: [user.lastname, Validators.required],
      email: [{ value : user.email, disabled : true}, [Validators.email, Validators.required]],
      password: [null, Validators.required],
      repeat_password: [null, Validators.required],
      sexe: [user.sexe, Validators.required],
      description: [""]
    });
    this.placeInputValue.pipe(map((word: any) => word.srcElement.value), debounceTime(200), distinctUntilChanged()).subscribe(async (keyword) => {
      this.places = await this.addressService.findPlaces(keyword);
      this.selected = false;
    });

    this.oldAddress = await this.addressService.getMyAddress().toPromise();
    this.placeInput.nativeElement.value = this.oldAddress.address;
  }

  async findPlaces(keyword) {
    this.placeInputValue.next(keyword);
  }


  onSelectionChange(place) {
    this.selected = true;
    this.place = place;
    this.placeInput.nativeElement.value = `${place.name} , ${place.country}`
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
    await this.addressService.attach(obj).toPromise().then(async (res: any) => {
      this.notificationService.primary(this.translate.instant("settings.success_description"),this.translate.instant('register.success.title'));
    })
  }


  beforeUpload = async (file) => {
    this.avatar = file;
    this.getAvatarBlob(file)
    const formData = new FormData();
    formData.append('avatar', this.avatar);
    const user = await this.userService.setAvatar(formData).toPromise();
    this.authService.setCurrentUser(user);
    return false;
  }

  getAvatarBlob(file): any {
    if(file instanceof File){
      var reader = new FileReader();
      reader.onloadend = async () => {
        this.avatarUrl = reader.result;
      }
      reader.readAsDataURL(file)
    }
  }



  submitChange(){
    if(this.place){
      if(this.oldAddress.address != this.place.place_name && this.selected){
        this.attachPlace();
      }
    }
    this.userService.updateUser(this.form.value).toPromise().then(() => {
      this.notificationService.primary(this.translate.instant("settings.success_description"),this.translate.instant('register.success.title'));
    }).catch(err => {
      for (const [key, value] of Object.entries(err)) {
        this.notificationService.danger(this.translate.instant('register.error.desc'), value)
      }
    });


  }


}
