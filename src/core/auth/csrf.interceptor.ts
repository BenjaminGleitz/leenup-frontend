import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const csrf = authService.csrfToken();

  if (!csrf || req.method === 'GET') {
    return next(req);
  }

  return next(req.clone({ setHeaders: { 'X-Csrf-Token': csrf } }));
};
