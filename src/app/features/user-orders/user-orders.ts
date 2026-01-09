import { Component, inject, OnInit, signal } from '@angular/core';
import { Checkout } from '../../core/services/checkout/checkout';
import { fluxCartStore } from '../../core/store/FluxCart.store';
import { UserOrder } from '../../core/models/orders/orders';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EmptyOrders } from './empty-orders/empty-orders';

@Component({
  selector: 'app-user-orders',
  imports: [DatePipe, TitleCasePipe, MatProgressSpinner, EmptyOrders],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss',
})
export class UserOrders implements OnInit {
  private readonly checkout = inject(Checkout);
  private readonly store = inject(fluxCartStore);
  requestLoading = signal<boolean>(false);
  ordersList = signal<UserOrder[]>([]);
  ngOnInit(): void {
    this.userOrders();
  }

  userOrders(): void {
    this.requestLoading.update((value) => true);
    this.checkout.getUserOrders(this.store.userData().id).subscribe({
      next: (res) => {
        console.log(res);
        this.ordersList.set(res);
        this.requestLoading.update((value) => false);
      },
      error: (err) => {
        console.log(err);
        this.requestLoading.update((value) => false);
      },
    });
  }
}
