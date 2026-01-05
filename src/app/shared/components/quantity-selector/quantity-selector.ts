import { Component, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { fluxCartStore } from '../../../core/store/FluxCart.store';

@Component({
  selector: 'app-quantity-selector',
  imports: [MatIconButton, MatIcon],
  templateUrl: './quantity-selector.html',
  styleUrl: './quantity-selector.scss',
})
export class QuantitySelector {
  readonly store = inject(fluxCartStore);
  quantity = input.required<number>();
  productId = input.required<string>();
}
