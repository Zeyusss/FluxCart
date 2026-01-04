import { Component, inject, input } from '@angular/core';
import { Product } from '../../../core/models/products/products';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { fluxCartStore } from '../../../core/store/FluxCart.store';
@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly store = inject(fluxCartStore);
  product = input<Product>({} as Product);
}
