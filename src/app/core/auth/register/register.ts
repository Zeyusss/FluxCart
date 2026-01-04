import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { initRegisterForm } from '../models/auth.init';
import { RegisterInterface } from '../../models/auth/auth';
import { form, Field } from '@angular/forms/signals';
import { registerSchema } from '../models/auth.schema';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Toaster } from '../../services/toaster/toaster';

@Component({
  selector: 'app-register',
  imports: [Field, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toaster = inject(Toaster);
  requestLoading = signal<boolean>(false);
  subscription: Subscription = new Subscription();
  registerFormModel = signal<RegisterInterface>(initRegisterForm);
  registerForm = form<RegisterInterface>(this.registerFormModel, registerSchema);

  onSubmit(e: Event): void {
    e.preventDefault();
    this.requestLoading.update((value) => true);
    if (this.registerForm().valid()) {
      this.subscription.unsubscribe();
      this.subscription = this.authService.registerPost(this.registerForm().value()).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.requestLoading.update((value) => false);
            this.router.navigate(['/login']);
            this.toaster.success('Account Created Successfully.');
          }
        },
        error: (err) => {
          console.log(err);
          this.toaster.error(err.error.message);
          this.requestLoading.update((value) => false);
        },
      });
    }
  }
}
