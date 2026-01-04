import { Component, inject, OnInit } from '@angular/core';
import { BackButton } from '../../shared/components/back-button/back-button';
import { fluxCartStore } from '../../core/store/FluxCart.store';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { EmptyWishlist } from './empty-wishlist/empty-wishlist';

@Component({
  selector: 'app-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatIconButton, EmptyWishlist],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  readonly store = inject(fluxCartStore);
}
