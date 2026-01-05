import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { fluxCartStore } from '../../../../core/store/FluxCart.store';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tease-wishlist',
  imports: [MatIcon, MatButton, RouterLink],
  templateUrl: './tease-wishlist.html',
  styleUrl: './tease-wishlist.scss',
})
export class TeaseWishlist {
  readonly store = inject(fluxCartStore);
}
