import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { PaymentService } from 'src/app/core/services/payment.service';
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
    private paymentService : PaymentService) { }

  iban;
  account;
  loading = true;
  transfers;
  async ngOnInit() {
    this.account = await this.teacherService.getStripeAccount().toPromise();
    if(this.account.external_accounts.data.length){
      this.iban = "**** **** **** **** "+ this.account.external_accounts.data[0].last4;
    }

    this.getTransfers();
  }
  
  async getTransfers(){
    this.transfers = await this.teacherService.getTransfers().toPromise();
    console.log(this.transfers);
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

  async getReceipt(charge_id){
    const charge = await this.paymentService.getReceipt(charge_id).toPromise();
    console.log(charge);
  }
}
