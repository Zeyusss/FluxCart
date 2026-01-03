import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterInterface, AuthResponse, LoginInterface } from '../../models/auth/auth';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  registerPost(data: RegisterInterface): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.baseUrl}/auth/signup`, data);
  }

  LoginPost(data: LoginInterface): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.baseUrl}/auth/signin`, data);
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }
  logOut() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
