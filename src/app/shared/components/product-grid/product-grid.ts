import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Products } from '../../../core/services/products/products';
import { Product } from '../../../core/models/products/products';
import { ProductCard } from '../product-card/product-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { Categories } from '../../../core/services/categories/categories';
import { Category } from '../../../core/models/categories/categories';
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
  ],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.scss',
})
export class ProductGrid implements OnInit {
  private readonly products = inject(Products);
  private readonly categories = inject(Categories);
  private readonly route = inject(ActivatedRoute);

  productsList = signal<Product[]>([]);
  categoryList = signal<string[]>(["men's-fashion", 'electronics', "women's-fashion"]);
  slug = signal<string>('');
  filteredProducts = computed(() => {
    const slug = this.slug();
    if (!slug) return this.productsList();
    return this.productsList().filter((p) => p.category.slug === this.slug().toLowerCase());
  });

  ngOnInit(): void {
    this.getAllProductsData();
    this.getSlug();
  }
  getAllProductsData(): void {
    this.products.getAllProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getSlug(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug.set(params.get('slug') ?? '');
    });
  }
}
