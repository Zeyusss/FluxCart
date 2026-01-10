import { Component, inject, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { resetPassword } from '../../models/auth/auth';
import { initResetPassword } from '../models/auth.init';
import { form, Field } from '@angular/forms/signals';
import { FormErrors } from '../../../shared/components/form-errors/form-errors';
import { resetPasswordSchema } from '../models/auth.schema';
import { AuthService } from '../../services/auth/auth';
import { Toaster } from '../../services/toaster/toaster';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [MatCard, MatButton, FormErrors, Field],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  private readonly authService = inject(AuthService);
  private readonly toaster = inject(Toaster);
  subscription: Subscription = new Subscription();
  requestLoading = signal<boolean>(false);
  resetPasswordModel = signal<resetPassword>(initResetPassword);
  resetPasswordForm = form(this.resetPasswordModel, resetPasswordSchema);

  onSubmit(e: Event): void {
    e.preventDefault();
    this.requestLoading.update((value) => true);
    if (this.resetPasswordForm().valid()) {
      this.subscription.unsubscribe();
      this.subscription = this.authService
        .resetPassword(this.resetPasswordForm().value())
        .subscribe({
          next: (res) => {
            this.requestLoading.update((value) => false);
            if (res.message === 'success') {
              this.authService.logOut();
              this.toaster.success('Password Changed Successfully');
            }
          },
          error: (err) => {
            console.log(err);
            this.toaster.error(err.error.message);
            this.requestLoading.update((value) => false);
          },
        });
    } else {
      this.requestLoading.update((value) => false);
    }
  }
}
