import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { PaymentService } from '../../services/payment/payment.service';
import { interval, Subject, Subscription } from 'rxjs';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-paymentloading',
  imports: [CommonModule, LottieComponent],
  templateUrl: './paymentloading.component.html',
  styleUrl: './paymentloading.component.css'
})
export class PaymentloadingComponent implements OnInit, OnDestroy {

  failureOptions = {
    // path: 'https://assets10.lottiefiles.com/packages/lf20_pwohahvd.json'
    path: 'https://lottie.host/b8a955c3-714d-46c2-8dc4-3dedd5fe0adb/mQFnnaCNUb.json'
  }

  successOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_jbrw3hcz.json'
  }

  loadingOptions = {
    path: 'https://lottie.host/d64bbc47-75c7-4020-b5b7-b61208678fbb/XvwWfFxPX4.json'
  }

  status: string | null = '';

  paymentStatus: 'Pending' | 'Completed' | 'Failed' = 'Pending';
  orderId: any = null;
  private destroy$ = new Subject<void>();
  private pollingSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService
  ) {

    // const orderId = this.activatedRoute.snapshot.queryParamMap.get('orderId');

    // effect(() => {
    //   interval(3500)
    //     .pipe(
    //       takeUntil(this.destroy$),
    //       switchMap(() => this.paymentService.getPaymentStatus(orderId))
    //     )
    //     .subscribe({
    //       next: (response: any) => {
    //         this.status = response?.status;
    //         console.log('poll: ', response);
    //       },
    //       error: (err) => console.error('Polling error', err)
    //     });
    // });
  }


  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        this.orderId = params.get('order_id');
        console.log('order: ', this.orderId);

        if (this.orderId) {
          this.pollPaymentStatus();
        } else {
          console.warn('No order_id in query params.');
        }
      }
    )
  }

  pollPaymentStatus() {
    console.log('Starting polling with orderId:', this.orderId);
    
    this.pollingSubscription = interval(3500)
      .pipe(
        switchMap(() => {
          console.log('Polling for orderId:', this.orderId);
          return this.paymentService.getPaymentStatus(this.orderId);
        }),
        takeWhile((response: any) => response?.status === 'Pending', true) 
      )
      .subscribe({
        next: (response: any) => {
          this.paymentStatus = response?.status;
          console.log('poll response:', response);
        },
        error: (err) => console.error('Polling error', err)
      });
  }



  ngOnDestroy(): void {
    // Clean up the observable subscription when the component is destroyed
    // this.destroy$.next();
    // this.destroy$.complete();

    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

}
