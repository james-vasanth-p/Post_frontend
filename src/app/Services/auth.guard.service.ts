import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map, Observable, tap, throwError } from 'rxjs';

export const AuthGuard = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  authService.isTokenExpired();
  return authService.userSignedIn$.pipe(
    tap((loggedIn) => {
      if (!loggedIn) {
        router.navigate(['/login']).then(() => alert('Login to continue..'));
      }
    })
  );
};

