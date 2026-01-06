import { Component, inject, input } from '@angular/core';
import { Product } from '../../../core/models/products/products';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { fluxCartStore } from '../../../core/store/FluxCart.store';
import { AuthService } from '../../../core/services/auth/auth';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { AuthActionFacade } from '../../../core/services/auth-action-facade/auth-action-facade';
@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly authActionFacade = inject(AuthActionFacade);
  product = input<Product>({} as Product);
}
