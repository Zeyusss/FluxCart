import { Component, inject, signal } from '@angular/core';
import { MatStepper, MatStep } from '@angular/material/stepper';
import {
  ChangePasswordInterFace,
  ForgotPasswordInterFace,
  ResetCodeInterFace,
} from '../../models/auth/auth';
import { initChangePassword, initForgotPassword, initResetCode } from '../models/auth.init';
import { form, Field } from '@angular/forms/signals';
import { changePasswordSchema, forgotPasswordSchema, resetCodeSchema } from '../models/auth.schema';
import { FormErrors } from '../../../shared/components/form-errors/form-errors';
import { AuthService } from '../../services/auth/auth';
import { Toaster } from '../../services/toaster/toaster';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [MatStepper, MatStep, Field, FormErrors],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  private readonly authService = inject(AuthService);
  private readonly toaster = inject(Toaster);
  private readonly router = inject(Router);
  step = signal<number>(1);
  requestLoading = signal<boolean>(false);
  subscription: Subscription = new Subscription();

  // ForgotPassword
  forogtPasswordModel = signal<ForgotPasswordInterFace>(initForgotPassword);
  forgotPasswordForm = form(this.forogtPasswordModel, forgotPasswordSchema);

  onSubmitEmail(e: Event): void {
    e.preventDefault();
    this.requestLoading.update((value) => true);
    if (this.forgotPasswordForm().valid()) {
      this.subscription.unsubscribe();
      this.subscription = this.authService
        .forgotPassword(this.forgotPasswordForm().value())
        .subscribe({
          next: (res) => {
            this.requestLoading.update((value) => false);
            this.toaster.success(res.message);
            this.step.update((value) => 2);
          },
          error: (err) => {
            console.log(err);
            this.requestLoading.update((value) => false);
            this.toaster.error(err.error.message);
          },
        });
    } else {
      this.requestLoading.update((value) => false);
    }
  }

  // ResetCode
  resetCodeModel = signal<ResetCodeInterFace>(initResetCode);
  resetCodeForm = form(this.resetCodeModel, resetCodeSchema);

  onSubmitCode(e: Event): void {
    e.preventDefault();
    this.requestLoading.update((value) => true);
    if (this.resetCodeForm().valid()) {
      this.subscription.unsubscribe();
      const value = { resetCode: this.resetCodeForm().value()?.resetCode.trim() ?? '' };
      this.subscription = this.authService.verifyResetCode(value).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.requestLoading.update((value) => false);
            this.toaster.success('Code Verified');
            this.step.update((value) => 3);
          }
        },
        error: (err) => {
          console.log(err);
          this.requestLoading.update((value) => false);
          this.toaster.error(err.error.message);
        },
      });
    } else {
      this.requestLoading.update((value) => false);
    }
  }

  // ChangePassword
  changePasswordModel = signal<ChangePasswordInterFace>(initChangePassword);
  changePasswordForm = form(this.changePasswordModel, changePasswordSchema);

  onSubmitChangePassword(e: Event): void {
    e.preventDefault();
    this.requestLoading.update((value) => true);
    if (this.changePasswordForm().valid()) {
      this.subscription.unsubscribe();
      this.subscription = this.authService
        .changePassword(this.changePasswordForm().value())
        .subscribe({
          next: (res) => {
            this.requestLoading.update((value) => false);
            this.toaster.success('Password changed successfully');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.log(err);
            this.requestLoading.update((value) => false);
            this.toaster.success(err.error.message);
          },
        });
    } else {
      this.requestLoading.update((value) => false);
    }
  }
}
