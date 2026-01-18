import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { tokenInterceptor } from './core/interceptors/token/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions(), withHashLocation()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    provideHotToastConfig({ style: { marginTop: '70px' }, stacking: 'depth', duration: 1000 }),
  ],
};
