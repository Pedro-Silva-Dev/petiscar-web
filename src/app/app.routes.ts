import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth.page/auth.page.component';
import { AppComponent } from './app.component';
import { authGuard } from './shared/guards/auth.guard';
import { isAuthUserGuard } from './shared/guards/is-auth-user.guard';
import { ProductPageComponent } from './pages/product.page/product.page.component';
import { ROUTE } from './shared/enums/route.enum';

export const routes: Routes = [
  {path: ROUTE.INDEX, redirectTo: ROUTE.AUTH, pathMatch: 'full'},
  {path: ROUTE.AUTH, component: AuthPageComponent, canActivate: [isAuthUserGuard]},
  {path: ROUTE.PRODUCT, component: ProductPageComponent, canActivate: [authGuard]},
];
