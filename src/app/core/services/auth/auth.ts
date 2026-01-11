import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RegisterInterface,
  AuthResponse,
  LoginInterface,
  JwtPayload,
  resetPassword,
  resetPasswordResponse,
  ForgotPasswordInterFace,
  ForgotPasswordResponse,
  ResetCodeInterFace,
  ResetCodeResponse,
  ChangePasswordInterFace,
  ChangePasswordResponse,
} from '../../models/auth/auth';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  token = signal<string | null>(localStorage.getItem('token'));

  registerPost(data: RegisterInterface): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.baseUrl}/auth/signup`, data);
  }

  LoginPost(data: LoginInterface): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.baseUrl}/auth/signin`, data);
  }

  resetPassword(data: resetPassword): Observable<resetPasswordResponse> {
    return this.httpClient.put<resetPasswordResponse>(
      `${environment.baseUrl}/users/changeMyPassword`,
      data
    );
  }
  // Forgot Password
  forgotPassword(data: ForgotPasswordInterFace): Observable<ForgotPasswordResponse> {
    return this.httpClient.post<ForgotPasswordResponse>(
      `${environment.baseUrl}/auth/forgotPasswords`,
      data
    );
  }

  verifyResetCode(data: ResetCodeInterFace): Observable<ResetCodeResponse> {
    return this.httpClient.post<ResetCodeResponse>(
      `${environment.baseUrl}/auth/verifyResetCode`,
      data
    );
  }

  changePassword(data: ChangePasswordInterFace): Observable<ChangePasswordResponse> {
    return this.httpClient.put<ChangePasswordResponse>(
      `${environment.baseUrl}/auth/resetPassword`,
      data
    );
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
    this.isLoggedIn.set(true);
  }
  logOut() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  decodeToken(): JwtPayload | null {
    let token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      this.logOut();
      return null;
    }
  }
}
