import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Garante Location em standalone (evita "No provider for Location" em telas que usam goBack)
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ]
};
