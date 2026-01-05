import { Component, inject } from '@angular/core';
import { fluxCartStore } from '../../../../core/store/FluxCart.store';
import { CartItem } from '../cart-item/cart-item';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-list-cart-items',
  imports: [CartItem, MatButton],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {
  readonly store = inject(fluxCartStore);
}
