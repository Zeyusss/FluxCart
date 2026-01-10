import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { initShipping } from './model/shipping.init';
import { form, Field } from '@angular/forms/signals';
import { shippingSchema } from './model/shipping.schema';
import { ActivatedRoute } from '@angular/router';
import { Checkout } from '../../../../core/services/checkout/checkout';
import { Subscription } from 'rxjs';
import { FormErrors } from '../../../../shared/components/form-errors/form-errors';
@Component({
  selector: 'app-shipping-form',
  imports: [MatIcon, MatFormField, MatInput, Field, FormErrors],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
})
export class ShippingForm implements OnInit {
  private readonly checkout = inject(Checkout);
  private readonly activatedRoute = inject(ActivatedRoute);
  cartId = signal<string | null>('');
  subscription: Subscription = new Subscription();
  requestLoading = signal<boolean>(false);

  shippingModel = signal(initShipping);
  shippingForm = form(this.shippingModel, shippingSchema);

  ngOnInit(): void {
    this.getCartId();
  }
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramUrl) => {
        this.cartId.set(paramUrl.get('cartId'));
      },
    });
  }
  onSubmit(e: Event) {
    e.preventDefault();
    this.requestLoading.update((value) => true);
    if (this.shippingForm().valid()) {
      this.subscription.unsubscribe();
      this.subscription = this.checkout
        .checkOutSession(this.cartId(), this.shippingForm().value())
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.requestLoading.update((value) => false);
              window.open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
            this.requestLoading.update((value) => false);
          },
        });
    } else {
      this.requestLoading.update((value) => false);
    }
  }
}
