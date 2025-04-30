import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-paymentloading',
  imports: [CommonModule, LottieComponent],
  templateUrl: './paymentloading.component.html',
  styleUrl: './paymentloading.component.css'
})
export class PaymentloadingComponent implements OnInit {

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

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        this.status = params.get('status');
        console.log('status: ', this.status);
      }
    )
  }

}
