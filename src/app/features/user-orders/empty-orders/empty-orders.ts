import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-orders',
  imports: [MatIcon, RouterLink],
  templateUrl: './empty-orders.html',
  styleUrl: './empty-orders.scss',
})
export class EmptyOrders {}
