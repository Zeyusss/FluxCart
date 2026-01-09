import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../core/services/products/products';
import { Product } from '../../core/models/products/products';
import { BackButton } from '../../shared/components/back-button/back-button';
import { fluxCartStore } from '../../core/store/FluxCart.store';
import { ProductInfo } from './components/product-info/product-info';

@Component({
  selector: 'app-product-details',
  imports: [BackButton, ProductInfo],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly store = inject(fluxCartStore);
  productId = signal<string | null>('');
  backRoute = computed(() => `/home/${this.store.slug()}`);

  ngOnInit(): void {
    this.getProductId();
    this.store.productDetailsData(this.productId());
  }
  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramUrl) => {
        this.productId.set(paramUrl.get('productId'));
      },
    });
  }
}
