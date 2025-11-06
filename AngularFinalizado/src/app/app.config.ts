import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]), // Si usas rutas, déjalo así
    provideHttpClient() // ← ESTA LÍNEA ES IMPORTANTE
  ]
};