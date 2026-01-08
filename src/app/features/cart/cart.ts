import { Component, inject } from '@angular/core';
import { BackButton } from '../../shared/components/back-button/back-button';
import { ListCartItems } from './components/list-cart-items/list-cart-items';
import { TeaseWishlist } from './components/tease-wishlist/tease-wishlist';
import { SummarizeOrder } from '../../shared/components/summarize-order/summarize-order';
import { fluxCartStore } from '../../core/store/FluxCart.store';
import { EmptyCart } from './components/empty-cart/empty-cart';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    BackButton,
    ListCartItems,
    TeaseWishlist,
    SummarizeOrder,
    EmptyCart,
    MatAnchor,
    RouterLink,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly store = inject(fluxCartStore);
}
