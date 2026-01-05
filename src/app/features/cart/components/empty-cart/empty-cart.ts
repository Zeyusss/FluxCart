import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-empty-cart',
  imports: [MatIcon, RouterLink, MatButton],
  templateUrl: './empty-cart.html',
  styleUrl: './empty-cart.scss',
})
export class EmptyCart {}
