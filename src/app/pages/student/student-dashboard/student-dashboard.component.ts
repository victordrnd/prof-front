import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StripeService } from 'ngx-stripe';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private paymentService: PaymentService,
    private notificationService: NbToastrService,
    private translate: TranslateService,
    private stripe: StripeService) { }

  actions;
  loading = false;
  async ngOnInit() {
    this.getActions();
  }


  async getActions() {
    this.actions = await this.paymentService.getActionsRequired().toPromise();
  }
  async confirmIntent(action) {
    this.loading = true;
    const intent: any = await this.paymentService.getIntent(action.payment_id).toPromise();
    console.log(intent);
    this.stripe.handleCardAction(intent.client_secret).toPromise().then(async res => {
      await this.paymentService.confirmIntent(action.id).toPromise();
      this.getActions();
      this.notificationService.success("",this.translate.instant("shared.success"));
    }).catch(err => {
      this.notificationService.danger(this.translate.instant("shared.error_description", this.translate.instant("shared.error")));
    }).finally(() => this.loading = false);
  }
}
