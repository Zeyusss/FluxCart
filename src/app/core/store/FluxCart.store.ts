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
import { Cart } from '../services/cart/cart';
import { CartResponse } from '../models/cart/cart';
import { AuthService } from '../services/auth/auth';
import { JwtPayload } from '../models/auth/auth';

export const fluxCartStore = signalStore(
  { providedIn: 'root' },
  withState(initStore),
  withMethods(
    (
      store,
      toaster = inject(Toaster),
      productsApi = inject(Products),
      wishlistApi = inject(Wishlist),
      cartApi = inject(Cart),
      authApi = inject(AuthService)
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
            this.getUserWishlist();
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
            this.getUserWishlist();
            toaster.success('Product Removed Succusfully');
          },
          error: (err) => {
            console.log(err);
            toaster.error(err.error.message);
          },
        });
      },
      getUserWishlist() {
        wishlistApi.getLoggedUserWishlist().subscribe({
          next: (res) => {
            patchState(store, { wishlistItems: res.data, wishlistIds: res.data.map((p) => p._id) });
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      addProductToCart(productId: string) {
        cartApi.addProductToCart(productId).subscribe({
          next: (res) => {
            console.log(res);
            this.getUserCart();
            toaster.success(res.message);
          },
        });
      },
      getUserCart() {
        cartApi.getLoggedUserCart().subscribe({
          next: (res) => {
            patchState(store, { cartItems: res.data.products, cartData: res });
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      updateCartProductQuantity(productId: string, count: number) {
        cartApi.updateCartProductQuantity(productId, count).subscribe({
          next: (res) => {
            console.log(res);
            this.getUserCart();
          },
        });
      },
      removeSpecifiCartItem(productId: string) {
        cartApi.removeSpecificCartItem(productId).subscribe({
          next: (res) => {
            console.log(res);
            this.getUserCart();
          },
        });
      },
      clearUserCart() {
        cartApi.clearUserCart().subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.getUserCart();
              toaster.success('Your Cart Has been Cleared');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      resetUserData() {
        patchState(store, {
          wishlistIds: [],
          cartItems: [],
          cartData: {} as CartResponse,
          userData: {} as JwtPayload,
        });
      },
      setUserData() {
        if (authApi.isLoggedIn()) {
          const decoded = authApi.decodeToken();
          if (decoded) {
            patchState(store, { userData: decoded });
          }
        }
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
    cartCount: computed(() => store.cartData()?.numOfCartItems ?? 0),
  })),
  withHooks({
    onInit: (store) => {
      store.loadAllProducts();
      store.getUserWishlist();
      store.getUserCart();
      store.setUserData();
    },
  })
);
