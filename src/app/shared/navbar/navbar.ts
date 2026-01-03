import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth';
@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatIconButton, MatIcon, MatButton, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly authService = inject(AuthService);

  logOut(): void {
    this.authService.logOut();
  }
}
