import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8000/app/cart/';
  private cartItemCountSubject = new BehaviorSubject<number>(0); // Initial value is 0
  cartItemCount$ = this.cartItemCountSubject.asObservable(); // Public observable

  constructor(private httpclient: HttpClient) { }

  incrementCartItems() {
    this.cartItemCountSubject.next(this.cartItemCountSubject.value + 1);
  }

  decrementCartItems() {
    this.cartItemCountSubject.next(this.cartItemCountSubject.value - 1);
  }

  setCartItemValue(val: number) {
    this.cartItemCountSubject.next(val);
  }


  getcart(): Observable<any> {
    return this.httpclient.get(this.apiUrl + "mycart/", { withCredentials: true })
  }

  addtocart(item: any): Observable<any> {
    return this.httpclient.post(this.apiUrl + "addtocart/", item, { withCredentials: true })
  }

  deleteitem(item_id: number): Observable<any> {
    const params = new HttpParams().set('item_id', item_id.toString());
    return this.httpclient.delete(this.apiUrl + 'deleteitem/', {
      params: params,
      withCredentials: true
    });
  }

  itemcount(): Observable<any> {
    return this.httpclient.get(this.apiUrl + 'itemcount/', { withCredentials: true })
  }

  updatQuantity(item_id: number, action: string) {
    return this.httpclient.patch(this.apiUrl + 'updatequantity/', { 'item_id': item_id, 'action': action }, { withCredentials: true })
  }





}
