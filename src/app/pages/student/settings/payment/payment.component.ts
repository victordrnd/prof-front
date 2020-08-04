import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { NzModalService } from 'ng-zorro-antd';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService : PaymentService,
    private modalService : NzModalService,
    private translate : TranslateService) { }

  paymentMethods
  
  async ngOnInit() {
    this.paymentMethods = await this.paymentService.getAllPaymentMethods().toPromise();
  }

  addPaymentMethod(){
    const modalRef = this.modalService.create({
      nzContent : AddPaymentComponent,
      nzTitle : this.translate.instant('payment.add'),
      nzFooter: null
    })
    modalRef.afterClose.subscribe(async () => {
      this.paymentMethods = await this.paymentService.getAllPaymentMethods().toPromise();
    })
  }


  detach(card){
    this.modalService.confirm({
      nzTitle : this.translate.instant('payment.delete.title'),
      nzIconType : "exclamation-circle",
      nzOnOk : () => {
        this.paymentService.detachPaymentMethod({pm_id : card.id}).toPromise().then(async () => {
          this.paymentMethods = await this.paymentService.getAllPaymentMethods().toPromise();
        })
      }
    })
  }
}
