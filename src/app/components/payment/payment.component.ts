import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookDetail } from 'src/app/models/entities/bookDetail';
import { CreditCard } from 'src/app/models/entities/creditCard';
import { Order } from 'src/app/models/entities/order';
import { Payment } from 'src/app/models/entities/payment';
import { BookService } from 'src/app/services/book.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentAddForm:FormGroup;

  constructor(private paymentService:PaymentService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createPaymentForm();
   
  }

  createPaymentForm(){
    this.paymentAddForm=this.formBuilder.group({
      nameSurname:["", Validators.required],
      creditCardNumber:["", Validators.required],
      expirationDate: ["", Validators.required],
      cvc:["", Validators.required],
    })
  }

  add(){
    if (this.paymentAddForm.valid) {
      let paymentModel= Object.assign({},this.paymentAddForm.value);
      this.paymentService.addPayment(paymentModel).subscribe(
        response => {
          this.toastrService.success("Başarılı")
        },
        responseError => {
          if (responseError.error.ValidationError.length>0) {
            for (let i = 0; i < responseError.error.ValidationError.length; i++) {
              this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage,"Doğrulama Hatası")
              
            }
          }
        }
      )
    } else {
      this.toastrService.error("Eksik form!","Lütfen boş alan bırakmayınız")
    }
  }

}
