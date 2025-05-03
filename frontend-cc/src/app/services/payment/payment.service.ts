// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000/app'; // Django API URL

  constructor(private http: HttpClient) { }

  initiatePayment(amount: number, orderId?: string): Observable<any> {
    const payload: any = {
      'total': amount
    };

    if (orderId) {
      payload.order_id = orderId;
    }

    return this.http.post(`${this.apiUrl}/payments/createorder/`, payload, { withCredentials: true });
  }


  getPaymentStatus(order_id: string | null) { 

    if(!order_id) {
      console.error('payment status error: order_id param null')
      return throwError(() => new Error('order_id is null'));
    }

    return this.http.get(`${environment.apiBaseUrl}/payments/check-status/`, {
      params: {'order_id': order_id},
      withCredentials: true
    });
  }


}