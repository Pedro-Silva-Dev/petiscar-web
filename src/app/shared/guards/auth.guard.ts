import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isUserAuth() ? true : inject(Router).navigate([`/auth`]);
};
