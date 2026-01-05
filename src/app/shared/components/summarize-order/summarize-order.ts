import { Component, computed, inject } from '@angular/core';
import { fluxCartStore } from '../../../core/store/FluxCart.store';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-summarize-order',
  imports: [MatButton],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {
  readonly store = inject(fluxCartStore);
  subTotal = computed(() => Math.round(this.store.cartData().data.totalCartPrice));
  tax = computed(() => Math.round(0.005 * this.subTotal()));
  totalCartPrice = computed(() => this.subTotal() - this.tax());
}
