import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../../../core/models/products/products';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QuantitySelector } from '../../../../shared/components/quantity-selector/quantity-selector';
import { MatButton, MatIconButton } from '@angular/material/button';
import { fluxCartStore } from '../../../../core/store/FluxCart.store';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../../../shared/components/toggle-wishlist-button/toggle-wishlist-button';
import { StarRating } from '../../../../shared/components/star-rating/star-rating';

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    StockStatus,
    MatButton,
    MatIcon,
    ToggleWishlistButton,
    MatIconButton,
    StarRating,
  ],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  readonly store = inject(fluxCartStore);
  inStock = computed(() => this.store.productDetails()?.quantity > 0);
}
