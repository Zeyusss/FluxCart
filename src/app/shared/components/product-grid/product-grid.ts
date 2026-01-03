import { Component, computed, inject, OnInit } from '@angular/core';
import { Products } from '../../../core/services/products/products';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { fluxCartStore } from '../../../core/store/FluxCart.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardSkeleton } from '../../skeletons/card-skeleton/card-skeleton';

@Component({
  selector: 'app-product-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    CardSkeleton,
  ],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.scss',
})
export class ProductGrid implements OnInit {
  readonly store = inject(fluxCartStore);
  private readonly route = inject(ActivatedRoute);
  cardSkeletons = Array(20);

  ngOnInit(): void {
    this.store.loadAllProducts();
    this.getSlug();
  }
  getSlug(): void {
    this.route.paramMap.subscribe((params) => {
      this.store.setSlug(params.get('slug') ?? '');
    });
  }
}
