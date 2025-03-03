import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { catchError, throwError } from 'rxjs';
import { MensagensService } from '../shared/messages.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MensagensService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout(); //necessário para apagar o token antigo
        router.navigate(['/login']);
        messageService.error("Credenciais inválidas ou tempo de sessão expirado");
      }
      return throwError(() => error);
    })
  );
};
