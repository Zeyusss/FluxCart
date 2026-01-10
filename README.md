# FluxCart
A modern, production-ready Angular e-commerce frontend built with Angular 21, Angular Signals, and NgRx Signal Store. It features authentication, product catalog, wishlist, cart and checkout flows, with a clean, responsive UI using Angular Material and Tailwind CSS.

![Angular](https://img.shields.io/badge/Angular-21.x-dd0031?logo=angular&logoColor=white)
![Signals](https://img.shields.io/badge/Angular-Signals-9333ea)
![NgRx](https://img.shields.io/badge/NgRx-Signal%20Store-764abc?logo=ngrx&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-0ea5e9?logo=tailwindcss&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-M3-6366f1)

## 1. Project Overview

FluxCart is a modern Angular e-commerce front-end focused on a clean shopping experience: browse products, filter by category, view product details, manage a wishlist, build a cart, and complete checkout.

This project exists as a production-minded Angular codebase that demonstrates:

- Strong separation of concerns (`core` vs `features` vs `shared`).
- Modern Angular patterns (standalone components, Signals, built-in control flow, lazy route components).
- Predictable, testable state management using **NgRx Signal Store**.
- Practical engineering concerns (auth token handling, loading UX, computed selectors, and UI consistency).

The application integrates with the public RouteMisr e-commerce API (`https://ecommerce.routemisr.com/api/v1`).

---

## 2. Key Features

- **Product catalog & category filtering** with responsive grid layout.
- **Product details** view with reusable UI building blocks.
- **Wishlist management** with optimistic-feeling UI and clear empty states.
- **Cart lifecycle**: add items, update quantities, remove items, clear cart.
- **Checkout session** integration that redirects to an external payment session.
- **Authentication flow** (register/login) with token persistence.
- **Route-level code-splitting** via `loadComponent()` for features.
- **Global UX feedback** via toast notifications.

---

## 3. Tech Stack

- **Angular 21 (Standalone APIs)**
  - Chosen for modern application bootstrapping (`bootstrapApplication` + `ApplicationConfig`), faster iteration, and simpler mental model than `NgModule`-heavy setups.
- **Signals + `@ngrx/signals` (Signal Store)**
  - Centralized, reactive state with explicit mutations (`patchState`) and derived selectors (`computed`).
  - Keeps UI components lean and minimizes manual subscription boilerplate.
- **Angular Router**
  - Lazy loaded route components, component input binding, and view transitions for a smooth navigation experience.
- **Angular Material (Material 3)**
  - Accessible, consistent UI primitives; theming is applied globally via `mat.theme()`.
- **Tailwind CSS (v4)**
  - Rapid layout composition and consistent spacing/typography utilities, used alongside Material.
- **RxJS**
  - Used at the data access boundary (HTTP Observables) and for async workflows.
- **Vitest**
  - Lightweight, fast unit testing experience (configured via `vitest/globals`).
- **`@ngxpert/hot-toast`**
  - User-friendly, non-blocking toast notifications.

---

## 4. Architecture & Design

### High-level architecture

FluxCart follows a layered front-end architecture:

- **Presentation layer** (`features/` and `shared/`): standalone components that render UI and bind to Signals.
- **State layer** (`core/store/`): a single application store (`fluxCartStore`) built with NgRx Signal Store.
- **Domain/data layer** (`core/services/` + `core/models/`): API clients and typed interfaces.
- **Cross-cutting concerns** (`core/interceptors/`, `core/guards/`): auth token injection and route protection.

### State management strategy (Signals + NgRx Signal Store)

The application uses **one root Signal Store** (`fluxCartStore`) provided in `root`.

- **State** is defined in `core/store/models` (`store.interface.ts` + `store.init.ts`).
- **Mutations** happen through store methods (e.g., `loadAllProducts`, `addToWishlist`, `getUserCart`).
- **Derived state** uses `withComputed` selectors (e.g., `filteredProducts`, `wishlistCount`, `cartCount`).
- **Lifecycle orchestration** uses `withHooks({ onInit })` to prefetch key data.
- **Auth-driven side effects** are coordinated via an Angular `effect()` (`AuthEffect`), reacting to the auth signal.

This provides a predictable data model without the ceremony of reducers/actions for a small-to-mid sized commerce app.

### Component structure philosophy

- **Feature routes** are thin shells that compose smaller components and bind to the store.
- **Reusable UI components** live in `shared/components` (buttons, dialogs, product cards, grids, form errors).
- **Pure display components** rely on inputs and computed values; side effects are pushed to facades/store methods.

### Reusability approach

- Shared, composable components (`ProductCard`, `StarRating`, `BackButton`, `FormErrors`).
- Facade-style service (`AuthActionFacade`) to keep auth-guarded actions consistent across the UI.

---

## 5. Project Structure

`src/`

- **`app/`**: application code
  - **`app.config.ts`**: providers (router, HTTP client, interceptors, toasts)
  - **`app.routes.ts`**: route definitions using lazy `loadComponent()`
  - **`app.ts` / `app.html`**: root layout (navbar + routed content)
  - **`core/`**: foundational building blocks
    - **`services/`**: API clients (auth, products, cart, wishlist, checkout)
    - **`models/`**: typed interfaces for API payloads
    - **`store/`**: NgRx Signal Store state + methods + computed selectors
    - **`interceptors/`**: token attachment to protected API calls
    - **`guards/`**: route guards (e.g., prevent opening login/register while authenticated)
    - **`auth/`**: auth pages & signal-based form models
  - **`features/`**: routed feature screens (home, cart, wishlist, checkout, orders, etc.)
  - **`shared/`**: reusable components, navbar, skeleton loaders
- **`environments/`**: runtime configuration (`environment.ts`, `environment.development.ts`)

This structure scales because it makes dependencies explicit:

- `features/` depends on `core/` and `shared/`.
- `shared/` stays UI-oriented and reusable.
- `core/` is the single source of truth for domain logic and API communication.

---

## 6. Data Flow

### API → Store → UI (typical path)

1. **UI event** (e.g., user clicks “Add to cart”).
2. **Facade/store method** is called:
   - If auth is required, `AuthActionFacade` checks `AuthService.isLoggedIn()` and opens a `SignInDialog` if needed.
3. **API request** is executed through a `core/services/*` client (`HttpClient`).
4. **Store updates**:
   - On success, `patchState()` updates state (`cartData`, `wishlistIds`, `products`, etc.).
   - Derived values update automatically through computed selectors.
5. **UI reacts**:
   - Components bind directly to Signals such as `store.loading()`, `store.filteredProducts()`, `store.cartCount()`.

### Efficient use of Signals

- **Computed selectors** (e.g., `filteredProducts`) avoid recomputing in templates and provide a single authoritative derivation.
- **Signal-driven auth state** (`AuthService.isLoggedIn` / `AuthService.token`) makes auth changes immediately reflect in UI/state.
- **Store hooks** run once on init to prefetch and hydrate key state (products, wishlist, cart, user payload).

---

## 7. UI/UX Considerations

### Performance

- **Lazy-loaded feature routes** using `loadComponent()` minimize initial JS cost.
- **Fetch-based `HttpClient`** (`provideHttpClient(withFetch())`) aligns with modern browser primitives.
- **Skeleton loaders** (e.g., product grid placeholders) reduce perceived latency.
- **Computed selectors** reduce template work and prevent repeated filtering computations.

### Accessibility

- Angular Material components provide baseline accessibility (ARIA attributes, keyboard support).
- Form errors are rendered with `role="alert"` and only shown when controls are touched and invalid.

### Responsiveness

- Tailwind utilities plus a responsive grid (`.responsive-grid`) ensure layout scales from mobile to desktop.
- Navbar uses Material primitives and badges for clear cart/wishlist affordances.

### UX decisions

- Immediate feedback via toast notifications for key actions.
- Auth-gated actions prompt users with a dialog rather than failing silently.
- View transitions enabled at router level for smoother navigation.

---

## 8. Installation & Running Locally

### Prerequisites

- Node.js (recommended: latest LTS)
- npm (this repo targets npm `11.x` per `package.json`)

### Setup

```bash
npm install
```

### Start dev server

```bash
npm start
```

Navigate to:

`http://localhost:4200/`

### Build

```bash
npm run build
```

### Unit tests

```bash
npm test
```

---

## 9. Environment Configuration

Environment files live in:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

Current configuration exposes:

- `environment.baseUrl` (RouteMisr e-commerce API base URL)

Best practices for production:

- Keep environment files **non-secret**. Do not commit API keys or credentials.
- If you introduce secrets, inject them at build/deploy time (CI variables) and never hardcode them.
- Checkout currently uses a hardcoded redirect URL:
  - `orders/checkout-session/:cartId?url=http://localhost:4200`
  - Update this for your deployed domain (or derive it from environment config).

---

## 10. Future Improvements

- Replace manual `subscribe()` usage in UI components with `takeUntilDestroyed()` consistently to prevent leaks.
- Introduce a dedicated **error handling strategy** (typed error models + centralized logging).
- Add **caching and retry policies** (e.g., products catalog) and improved offline UX.
- Improve security by moving from localStorage tokens to **httpOnly cookies** where applicable.
- Add E2E coverage (Playwright/Cypress) and CI checks (lint + test + build).
- Consider SSR/SSG (Angular SSR) for SEO and faster first contentful paint.

---

## 11. Developer Notes

### Advanced patterns used

- **Standalone application bootstrap** (`bootstrapApplication`) and centralized `ApplicationConfig`.
- **NgRx Signal Store** with:
  - `withState` for canonical state
  - `withMethods` for write operations and side effects
  - `withComputed` for selectors
  - `withHooks` for initialization
- **Angular Signals Forms** (`@angular/forms/signals`) with schema-driven validation and reusable error rendering.
- **Auth orchestration via `effect()`** to keep store hydration in sync with login/logout.
- **Router view transitions** enabled via `withViewTransitions()`.

### Trade-offs (intentional)

- A single root store is simpler and fast to iterate on; for larger products, splitting into feature stores can improve ownership and reduce coupling.
- Store methods currently encapsulate HTTP subscriptions; moving to `rxMethod` patterns (or wrapping into reusable RxJS operators) can improve composability and testability as complexity grows.

### What makes this project “Great”

- Clear architectural boundaries and typed data contracts.
- Modern Angular APIs used intentionally (Signals, standalone components, router composition).
- Focus on maintainability (reusable UI components, facade for auth-gated actions).
- Attention to user experience (loading states, empty states, toasts, transitions).

---

## 12. Author

Built as a production-minded Angular portfolio project.

If you are a recruiter or hiring manager:

- Review `src/app/core/store/FluxCart.store.ts` to see the application’s Signal Store strategy.
- Review `src/app/app.config.ts` to understand provider configuration (router, HTTP, interceptors).
- Review `src/app/shared/components` to evaluate reusability and UI composition.
