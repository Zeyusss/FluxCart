import { Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  imports: [MatIcon],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  rating = input.required<number>();
  count = input.required<number | null>();
  size = input<'sm' | 'md' | 'lg'>('md');

  stars = computed(() => {
    const value = this.rating() ?? 0;

    const full = Math.floor(value);
    const half = value % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return {
      full: Array(full),
      half,
      empty: Array(empty),
    };
  });

  sizeClass = computed(() => {
    return {
      sm: '!text-sm',
      md: '!text-base',
      lg: '!text-xl',
    }[this.size()];
  });
}
