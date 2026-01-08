import { Component, inject, viewChild } from '@angular/core';
import { BackButton } from '../../shared/components/back-button/back-button';
import { ShippingForm } from './components/shipping-form/shipping-form';
import { SummarizeOrder } from '../../shared/components/summarize-order/summarize-order';
import { MatButton } from '@angular/material/button';
import { fluxCartStore } from '../../core/store/FluxCart.store';
import { PaymentForm } from './components/payment-form/payment-form';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, SummarizeOrder, MatButton, PaymentForm],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  readonly store = inject(fluxCartStore);
  shippingForm = viewChild(ShippingForm);
}
