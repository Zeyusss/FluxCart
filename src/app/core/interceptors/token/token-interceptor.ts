import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  if (token) {
    if (
      req.url.includes('cart') ||
      req.url.includes('wishlist') ||
      req.url.includes('order') ||
      req.url.includes('changeMyPassword')
    ) {
      req = req.clone({
        setHeaders: {
          token: token,
        },
      });
    }
  }
  return next(req);
};
