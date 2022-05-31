import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PaymentService } from 'src/app/core/services/payment.service';
import { NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private paymentSerivce : PaymentService,
    private notificationService : NbToastrService,
    private translate : TranslateService,
    private modalService : NzModalService) { }

  form: FormGroup;
  invalid = {
    expiration: false
  }
  ngOnInit() {
    this.form = this.fb.group({
      number: ["", [Validators.required]],
      expiration: [null, Validators.required],
      cvv: [null, Validators.required]
    })
  }


  submit(){
    if(this.form.valid){
      this.paymentSerivce.createPaymentMethod(this.form.value).toPromise().then(res => {
        this.modalService.closeAll();
      }).catch(err => {
        this.notificationService.danger(this.translate.instant('payment.error'));
      })
    }
  }
  cardRegex(e) {
    let target = e.target, position = target.selectionEnd, length = target.value.length;
    target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
  }

  expirationRegex(e) {
    if (e.inputType != "deleteContentBackward") {
      e.target.value = e.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/'
      ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/'
      ).replace(
        /[^\d|^\/]*/g, ''
      ).replace(
        /\/\//g, '/'
      );
    }
    if (e.target.value.length == 5) {
      let pattern = new RegExp("^(0[1-9]|1[0-2]|[1-9])\/(1[4-9]|[2-9][0-9]|20[1-9][1-9])$");
      this.invalid.expiration = !pattern.test(e.target.value)
    }
  }
}
