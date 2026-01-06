import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAnchor } from '@angular/material/button';
@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIcon, MatAnchor],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {
  private readonly router = inject(Router);
  private readonly dialogRef = inject(MatDialogRef<SignInDialog>);
  goToLogin() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.dialogRef.close();
    this.router.navigate(['/register']);
  }
}
