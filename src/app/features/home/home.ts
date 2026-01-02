import { Component } from '@angular/core';
import { ProductGrid } from '../../shared/components/product-grid/product-grid';

@Component({
  selector: 'app-home',
  imports: [ProductGrid],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
