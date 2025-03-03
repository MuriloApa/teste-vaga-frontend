import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import { MensagensService } from './shared/messages.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './intercepts/jwt.interceptor';
import { authInterceptor } from './intercepts/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(MatSnackBarModule),
    MensagensService,
    provideHttpClient(withInterceptors([jwtInterceptor, authInterceptor]))]
};
