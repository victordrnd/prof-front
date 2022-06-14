import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService,
    private modalService: NzModalService,
    private translate: TranslateService) { }

  paymentMethods;
  loading = true;

  charges;
  async ngOnInit() {

    this.getCards();
    this.getCharges();
  }



  async getCards() {
    this.paymentMethods = await this.paymentService.getAllPaymentMethods().toPromise();
    const card = this.paymentMethods.data.find(el => el.id == this.paymentMethods.default_pm);
    if (card) {
      card.default = true;
    }
  }
  
  async getCharges() {
    this.charges = await this.paymentService.getMyCharges().toPromise();
    console.log(this.charges)
    this.loading = false;
  }

  addPaymentMethod() {
    const modalRef = this.modalService.create({
      nzContent: AddPaymentComponent,
      nzTitle: this.translate.instant('payment.add'),
      nzFooter: null
    })
    modalRef.afterClose.subscribe(async () => {
      await this.getCards();
    })
  }

  async toggleCardDefault(card, evt) {
    if (evt) {
      this.paymentMethods.data = this.paymentMethods.data.map(card => { card.default = false; return card })
      card.default = true;
      await this.paymentService.setDefaultPm({ default_pm: card.id }).toPromise();
    }

  }

  detach(card) {
    this.modalService.confirm({
      nzTitle: this.translate.instant('payment.delete.title'),
      nzIconType: "exclamation-circle",
      nzOnOk: () => {
        this.loading = true;
        this.paymentService.detachPaymentMethod({ pm_id: card.id }).toPromise().then(async () => {
          this.paymentMethods = await this.paymentService.getAllPaymentMethods().toPromise();
          this.loading = false;
        })
      }
    })
  }

  showReceipt(url){
    window.open(url, "_blank");
  }
}
