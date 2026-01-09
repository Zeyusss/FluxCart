import { effect, inject, Injectable } from '@angular/core';
import { AuthService } from '../auth';
import { fluxCartStore } from '../../../store/FluxCart.store';
import { patchState } from '@ngrx/signals';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  private auth = inject(AuthService);
  private store = inject(fluxCartStore);

  constructor() {
    effect(() => {
      if (this.auth.isLoggedIn()) {
        this.store.getUserWishlist();
        this.store.getUserCart();
        this.store.setUserData();
      } else {
        this.store.resetUserData();
      }
    });
  }
}
