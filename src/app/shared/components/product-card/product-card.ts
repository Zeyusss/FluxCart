import { Component, input } from '@angular/core';
import { Product } from '../../../core/models/products/products';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input<Product>({} as Product);
}
