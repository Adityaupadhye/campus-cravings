import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment/payment.service';
// @ts-ignore
import { load } from '@cashfreepayments/cashfree-js';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class PaymentHomeComponent implements OnInit {

  amount: number = 100; // Default test amount
  loading = false;
  error: string | null = null;

  cashfree: any = null;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private spinner: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
  }


  async initializeSDK() {
    console.log('initializing cashfree web sdk');
    this.cashfree = await load({
        mode: "sandbox"
    });
  }


  async initiatePayment() {

    this.spinner.show();

    await this.initializeSDK();


    this.loading = true;
    this.error = null;

    this.paymentService.initiatePayment(this.amount).subscribe({
      next: (response: any) => {
        this.spinner.hide();
        if (response.status == 'success') {
          // get payment_session_id and pass it to cashfree sdk
          let checkoutOptions = {
            paymentSessionId: response['data']['payment_session_id'],
            redirectTarget: "_blank",
          };
          this.cashfree.checkout(checkoutOptions);

          // route to payment/progress?status=pending
          this.router.navigate(['payment/progress'], {
            queryParams: { status: 'pending' }
          });


        } else {
          this.error = 'Failed to initiate payment';
        }
        this.loading = false;
      },
      error: (err) => {
        this.spinner.hide();
        this.error = 'Error connecting to server';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
