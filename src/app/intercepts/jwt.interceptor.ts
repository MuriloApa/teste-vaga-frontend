import { inject } from '@angular/core';
import { HttpStatusCode, type HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


//Este método de interceptar rotas foi aprendido nas aulas de Programação Web com o professor Humberto Lidio
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getTokenStorage();

  if (!token) {
    return next(req);
  }

  const modified = req.clone({
    setHeaders: {
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });
  return next(modified).pipe(
    catchError((error)=>{
      if(error.status === HttpStatusCode.Unauthorized)
        router.navigate(['user', 'login'])

      return throwError(() => error);
    })
  )
};
