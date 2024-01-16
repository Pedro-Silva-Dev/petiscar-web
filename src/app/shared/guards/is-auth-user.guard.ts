import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const isAuthUserGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isUserAuth() ? inject(Router).navigate([`/produtos`]) : true;
};
