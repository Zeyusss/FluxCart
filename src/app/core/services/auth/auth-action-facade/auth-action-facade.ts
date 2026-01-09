import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth';
import { fluxCartStore } from '../../../store/FluxCart.store';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../../../../shared/components/sign-in-dialog/sign-in-dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthActionFacade {
  private readonly authService = inject(AuthService);
  private readonly store = inject(fluxCartStore);
  private readonly dialog = inject(MatDialog);

  handleAddToCart(productId: string) {
    if (!this.authService.isLoggedIn()) {
      this.dialog.open(SignInDialog);
      return;
    }
    this.store.addProductToCart(productId);
  }

  handleToggleWishlist(productId: string) {
    if (!this.authService.isLoggedIn()) {
      this.dialog.open(SignInDialog);
      return;
    }
    if (this.store.wishlistIds().includes(productId)) {
      this.store.removeFromWishlist(productId);
    } else {
      this.store.addToWishlist(productId);
    }
  }
}
