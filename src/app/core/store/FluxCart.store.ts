import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initStore } from './models/store.init';
import { computed, inject } from '@angular/core';
import { Products } from '../services/products/products';

export const fluxCartStore = signalStore(
  { providedIn: 'root' },
  withState(initStore),
  withMethods((store, productsApi = inject(Products)) => ({
    loadAllProducts() {
      patchState(store, { loading: true });
      productsApi.getAllProducts().subscribe({
        next: (res) => {
          patchState(store, { products: res.data }, { loading: false });
        },
        error: (err) => {
          console.log(err);
          patchState(store, { loading: false });
        },
      });
    },
    setSlug(slug: string) {
      patchState(store, { slug });
    },
  })),
  withComputed((store) => ({
    filteredProducts: computed(() => {
      if (!store.slug()) return store.products();
      return store.products().filter((p) => p.category.slug === store.slug().toLowerCase());
    }),
  }))
);
