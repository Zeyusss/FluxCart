import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initStore } from './models/store.init';
import { computed, inject } from '@angular/core';
import { Products } from '../services/products/products';
import { Wishlist } from '../services/wishlist/wishlist';
import { Toaster } from '../services/toaster/toaster';

export const fluxCartStore = signalStore(
  { providedIn: 'root' },
  withState(initStore),
  withMethods(
    (
      store,
      productsApi = inject(Products),
      wishlistApi = inject(Wishlist),
      toaster = inject(Toaster)
    ) => ({
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
      addToWishlist(productId: string) {
        wishlistApi.addProductToWishlist(productId).subscribe({
          next: (res) => {
            patchState(store, {
              wishlistIds: res.data,
            });
            toaster.success(res.message);
          },
          error: (err) => {
            console.log(err);
            toaster.error(err.error.message);
          },
        });
      },
      removeFromWishlist(productId: string) {
        wishlistApi.removeProductFromWishlist(productId).subscribe({
          next: (res) => {
            patchState(store, {
              wishlistIds: res.data,
            });
            this.getUserProductsWishlist();
            toaster.success('Product Removed Succusfully');
          },
          error: (err) => {
            console.log(err);
            toaster.error(err.error.message);
          },
        });
      },
      getUserProductsWishlist() {
        wishlistApi.getLoggedUserWishlist().subscribe({
          next: (res) => {
            patchState(store, { wishlistItems: res.data, wishlistIds: res.data.map((p) => p._id) });
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    })
  ),
  withComputed((store) => ({
    filteredProducts: computed(() => {
      if (!store.slug()) return store.products();
      return store.products().filter((p) => p.category.slug === store.slug().toLowerCase());
    }),
    wishlistCount: computed(() => {
      return store.wishlistIds().length;
    }),
  })),
  withHooks({
    onInit: (store) => {
      store.loadAllProducts();
      store.getUserProductsWishlist();
    },
  })
);
