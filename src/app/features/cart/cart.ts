import { Component, inject } from '@angular/core';
import { BackButton } from '../../shared/components/back-button/back-button';
import { ListCartItems } from './components/list-cart-items/list-cart-items';
import { TeaseWishlist } from './components/tease-wishlist/tease-wishlist';
import { SummarizeOrder } from '../../shared/components/summarize-order/summarize-order';
import { fluxCartStore } from '../../core/store/FluxCart.store';
import { EmptyCart } from './components/empty-cart/empty-cart';

@Component({
  selector: 'app-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, SummarizeOrder, EmptyCart],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly store = inject(fluxCartStore);
}
