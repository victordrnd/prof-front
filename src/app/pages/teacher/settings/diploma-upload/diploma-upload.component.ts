import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { DiplomaService } from 'src/app/core/services/diploma.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-diploma-upload',
  templateUrl: './diploma-upload.component.html',
  styleUrls: ['./diploma-upload.component.scss']
})
export class DiplomaUploadComponent implements OnInit {
  url = `${environment.apiUrl}/teacher/diploma/upload`;
  diplomas;
  loading = true;
  constructor(private http : HttpClient,
    private diplomaService : DiplomaService,
    private notificationService : NbToastrService,
    private translate : TranslateService,
    private authService : AuthService) { }
    
  async ngOnInit() {
    this.diplomas = await this.diplomaService.getMyDiplomas().toPromise();
    this.loading = false;
  }


  customRequest = (item) => {
    item.headers = {
      Authorization : "test"
    }
    const formData = new FormData();
    formData.append('file', item.file as any);
    return this.http.post(this.url,formData, {
      headers : new HttpHeaders().set('Authorization',  `Bearer ${this.authService.getToken()}`)
    }).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof Array) {
          this.diplomas = event;
          item.onSuccess!(event, item.file!, event);
        }
      },
      err => {
        item.onError!(err, item.file!);
        this.notificationService.danger(this.translate.instant("shared.error_description"), this.translate.instant('shared.error'))
      }
    );
  }


  openFile(diploma){
    window.open(diploma.link, "_blank");
  }

  deleteFile(diploma){
    this.diplomaService.deleteFile(diploma.id).toPromise().then(res => {
      this.diplomas = res;
    }).catch(err => {
      this.notificationService.danger(this.translate.instant("shared.error_description"), this.translate.instant('shared.error'))
    })
  }
}
