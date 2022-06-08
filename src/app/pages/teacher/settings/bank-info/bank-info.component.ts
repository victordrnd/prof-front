import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent implements OnInit {

  constructor(private teacherService : TeacherService,
    private notificationService : NbToastrService,
    private translate : TranslateService,
    private cdr : ChangeDetectorRef) { }

  iban;
  account;
  loading = true;
  async ngOnInit() {
    this.account = await this.teacherService.getStripeAccount().toPromise();
    this.iban = "**** **** **** **** "+ this.account.external_accounts.data[0].last4;
    this.loading = false;
  }
  
  
  
  async openStripeSetup(){
    const stripe_link = await this.teacherService.getStripeAccountLink().toPromise() as any;
    window.open(stripe_link.url, "_blank");
  }

  saveIban(){
    this.teacherService.createBankAccount(this.iban).toPromise().then(res => {
      this.notificationService.success(this.translate.instant("settings.success_description"), this.translate.instant('shared.success'));
    }).catch(err => {
      this.notificationService.danger(this.translate.instant("shared.error_description"), this.translate.instant('shared.error'))
    });
  }

  onIbanChange(iban){
    this.iban = iban.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  }
}