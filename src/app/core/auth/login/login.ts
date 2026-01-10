import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { LoginInterface } from '../../models/auth/auth';
import { initLoginForm } from '../models/auth.init';
import { form, Field } from '@angular/forms/signals';
import { loginSchema } from '../models/auth.schema';
import { Toaster } from '../../services/toaster/toaster';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormErrors } from '../../../shared/components/form-errors/form-errors';

@Component({
  selector: 'app-login',
  imports: [Field, RouterLink, FormErrors],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly toaster = inject(Toaster);
  private readonly router = inject(Router);
  requestLoading = signal<boolean>(false);
  subcription: Subscription = new Subscription();
  loginFormModel = signal<LoginInterface>(initLoginForm);
  loginForm = form<LoginInterface>(this.loginFormModel, loginSchema);

  onSubmit(e: Event): void {
    e.preventDefault();
    this.requestLoading.update((value) => true);
    if (this.loginForm().valid()) {
      this.subcription.unsubscribe();
      this.subcription = this.authService.LoginPost(this.loginForm().value()).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.authService.login(res.token);
            this.toaster.success('Loggedin Successfully');
            this.router.navigate(['/home']);
            this.requestLoading.update((value) => false);
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
