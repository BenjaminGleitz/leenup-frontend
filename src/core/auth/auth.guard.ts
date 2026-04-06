import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Protège les routes qui nécessitent une authentification.
 *
 * Fonctionnement :
 * - Si le signal isAuthenticated est déjà true (navigation dans la session),
 *   on laisse passer directement sans appel HTTP.
 * - Sinon (ex : refresh de page), on vérifie la session côté serveur via
 *   checkSession(). Si le cookie est encore valide → ok. Sinon → /login.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return authService.checkSession().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};
