import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth.page/auth.page.component';
import { AppComponent } from './app.component';
import { authGuard } from './shared/guards/auth.guard';
import { isAuthUserGuard } from './shared/guards/is-auth-user.guard';

export const routes: Routes = [
  // {path: '/', component: AppComponent, canActivate: [authGuard]},
  {path: 'auth', component: AuthPageComponent, canActivate: [isAuthUserGuard]}
];
