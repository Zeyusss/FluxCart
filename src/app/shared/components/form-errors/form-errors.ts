import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-errors',
  imports: [],
  templateUrl: './form-errors.html',
  styleUrl: './form-errors.scss',
})
export class FormErrors {
  control = input.required<any>();
}
