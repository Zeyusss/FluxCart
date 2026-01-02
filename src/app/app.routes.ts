import { Routes } from '@angular/router';

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
    loadComponent: () => import('./core/auth/login/login').then((c) => c.Login),
    title: 'Sign In',
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/register/register').then((c) => c.Register),
    title: 'Sign Up',
  },
  {
    path: '**',
    loadComponent: () => import('./features/notfound/notfound').then((c) => c.Notfound),
  },
];
