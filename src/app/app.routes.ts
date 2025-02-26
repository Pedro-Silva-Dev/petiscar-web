import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth.page/auth.page.component';
import { AppComponent } from './app.component';
import { authGuard } from './shared/guards/auth.guard';
import { isAuthUserGuard } from './shared/guards/is-auth-user.guard';
import { ProductPageComponent } from './pages/product.page/product.page.component';
import { ROUTE } from './shared/enums/route.enum';
import { CategoryPageComponent } from './pages/category.page/category.page.component';
import { PromotionPageComponent } from './pages/promotion.page/promotion.page.component';
import { CategoryDetailPageComponent } from './pages/category.page/category-detail.page/category-detail.page.component';

export const routes: Routes = [
  {path: ROUTE.INDEX, redirectTo: ROUTE.AUTH, pathMatch: 'full'},
  {path: ROUTE.AUTH, component: AuthPageComponent, canActivate: [isAuthUserGuard]},
  {path: ROUTE.PRODUCT, component: ProductPageComponent, canActivate: [authGuard]},
  {path: ROUTE.PRODUCT_DETAIL, component: ProductPageComponent, canActivate: [authGuard]},
  {path: ROUTE.CATEGORY, component: CategoryPageComponent, canActivate: [authGuard]},
  {path: ROUTE.CATEGORY_DETAIL, component: CategoryDetailPageComponent, canActivate: [authGuard]},
  {path: ROUTE.PROMOTION, component: PromotionPageComponent, canActivate: [authGuard]},
];
