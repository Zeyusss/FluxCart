import { Routes } from '@angular/router';
import { loggedinGuard } from './core/guards/isLoggedIn/loggedin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
    title: 'Home',
  },
  {
    path: 'home/:slug',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
    title: 'Home',
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist').then((c) => c.Wishlist),
    title: 'Wishlist',
  },
  {
    path: 'product-details/:productId',
    loadComponent: () =>
      import('./features/product-details/product-details').then((c) => c.ProductDetails),
    title: 'Product Details',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart').then((c) => c.Cart),
    title: 'Cart',
  },
  {
    path: 'allorders',
    loadComponent: () => import('./features/allorders/allorders').then((c) => c.Allorders),
    title: 'AllOrders',
  },
  {
    path: 'user-orders',
    loadComponent: () => import('./features/user-orders/user-orders').then((c) => c.UserOrders),
    title: 'My Orders',
  },
  {
    path: 'checkout/:cartId',
    loadComponent: () => import('./features/checkout/checkout').then((c) => c.Checkout),
    title: 'Checkout',
  },
  {
    path: 'login',
    canActivate: [loggedinGuard],
    loadComponent: () => import('./core/auth/login/login').then((c) => c.Login),
    title: 'Login',
  },
  {
    path: 'register',
    canActivate: [loggedinGuard],
    loadComponent: () => import('./core/auth/register/register').then((c) => c.Register),
    title: 'Register',
  },
  {
    path: 'forgot-password',
    canActivate: [loggedinGuard],
    loadComponent: () =>
      import('./core/auth/forgot-password/forgot-password').then((c) => c.ForgotPassword),
    title: 'Forgot password',
  },
  {
    path: '**',
    loadComponent: () => import('./features/notfound/notfound').then((c) => c.Notfound),
  },
];
