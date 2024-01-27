import { UiSidebar } from './ui-sidebar.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { UI_ICON } from '../../../shared/enums/ui-icons.num';
import { FeatherModule } from 'angular-feather';
import { UiIconDirective } from '../../../shared/directives/interface/icons/ui-icon.directive';
import { AuthService } from '../../../services/auth.service';
import { UserAuth } from '../../../models/public/user-auth.model';
import { Unsubscribable } from 'rxjs';
import { ROUTE } from '../../../shared/enums/route.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    UiIconDirective
  ],
  templateUrl: './ui-sidebar.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSidebarComponent implements OnInit, OnDestroy {
 
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _unsubscribe: Unsubscribable;

  protected open = signal(false);
  protected isUserAuth = signal(false);
  protected sidebarList: UiSidebar[] = [];
  protected principalSidebar: UiSidebar =  {name: 'Petiscar', icon: UI_ICON.MENU, roles: [], order: 0, link: ROUTE.INDEX, hover: signal(false)};
  protected user: UserAuth = this._authService.getUser();

  public openSidebar(): void {
    this.open.update(value => !value);
  }

  ngOnInit(): void {
    this._setIsUserAuthEvent();
    this._setConfigSidebar();
  } 

  ngOnDestroy(): void {
    this._unsubscribe?.unsubscribe();
  }

  public logout(): void {
    this._authService.logout();
  }

  public redirectPage(menu: UiSidebar): void {
    if(menu?.link) {
      this._router.navigate([`/${menu.link}`]);
    }
  }

  public hover(menu: UiSidebar, value: boolean): void {
    menu.hover.set(value);
  }

  /**************** METHODS PRIVATE ****************/

  private _setConfigSidebar(): void {
    this.sidebarList = [];
    this._getMenuList().forEach(res => {
      if(this._isMenuValid(res)) {
        this.sidebarList.push(res);
      }
    })
    this.sidebarList.sort((a,b) => a.order > b.order ? 1 : -1);
  }

  private _getMenuList(): UiSidebar[] {
    const promotionMenu: UiSidebar = {name: 'Promoções', icon: UI_ICON.PROMOTION, roles: [], order: 3, link: ROUTE.PROMOTION, hover: signal(false)};
    const productMenu: UiSidebar = {name: 'Produtos', icon: UI_ICON.PRODUCT, roles: [], order: 1, link: ROUTE.PRODUCT, hover: signal(false)};
    const categoryMenu: UiSidebar = {name: 'Categorias', icon: UI_ICON.CATEGORY, roles: [], order: 2, link: ROUTE.CATEGORY, hover: signal(false)};   
    const shopMenu: UiSidebar = {name: 'Compras', icon: UI_ICON.SHOP, roles: [], order: 4, link: ROUTE.PRODUCT, hover: signal(false)};
    const paymentMenu: UiSidebar = {name: 'Promoções', icon: UI_ICON.PAYMENT, roles: [], order: 5, link: ROUTE.PRODUCT, hover: signal(false)};
    const deliveryMenu: UiSidebar = {name: 'Entregas', icon: UI_ICON.DELIVERY, roles: [], order: 6, link: ROUTE.PRODUCT, hover: signal(false)};
    const userMenu: UiSidebar = {name: 'Conta', icon: UI_ICON.USER, roles: [], order: 99, link: ROUTE.PRODUCT, hover: signal(false)};
    const logoutMenu: UiSidebar = {name: 'Sair', icon: UI_ICON.LOG_OUT, roles: [], order: 100, link: ROUTE.PRODUCT, hover: signal(false)};

    return [productMenu, categoryMenu, promotionMenu, shopMenu, paymentMenu, deliveryMenu, userMenu, logoutMenu];
  }


  private _isMenuValid(menu: UiSidebar): boolean {
    if(menu?.roles?.length) {
      let isValid = false;
      this.user?.roles?.forEach(role => {
        const valid = menu.roles.find(userRole => userRole?.toLowerCase() == role?.toLowerCase()) ? true : false;
        if(valid) {
          isValid = true;
        }
      })
      return isValid;
    }
    return true;
  }

  private _setIsUserAuthEvent(): void {
    this._unsubscribe = this._authService.getIsUserAuthEvent().subscribe(res => {
      this.isUserAuth.set(res);
    });
  }

}
