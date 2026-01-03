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
    path: 'cart',
    loadComponent: () => import('./features/cart/cart').then((c) => c.Cart),
    title: 'Cart',
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
    path: '**',
    loadComponent: () => import('./features/notfound/notfound').then((c) => c.Notfound),
  },
];
