import { UiSidebar } from './ui-sidebar.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { UI_ICON } from '../../../shared/enums/ui-icons.num';
import { FeatherModule } from 'angular-feather';
import { UiIconDirective } from '../../../shared/directives/interface/ui-icon.directive';
import { AuthService } from '../../../services/auth.service';
import { UserAuth } from '../../../models/public/user-auth.model';

@Component({
  selector: 'app-ui-sidebar',
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
export class UiSidebarComponent implements OnInit {
  
  private _authService: AuthService = inject(AuthService);

  protected open = signal(false);
  protected sidebarList: UiSidebar[] = [];
  protected principalSidebar: UiSidebar =  {name: 'Petiscar', icon: UI_ICON.MENU, roles: [], order: 0};
  protected user: UserAuth = this._authService.getUser();

  public openSidebar(): void {
    this.open.update(value => !value);
  }

  ngOnInit(): void {
    this._setConfigSidebar();
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
    const promotionMenu: UiSidebar = {name: 'Promoções', icon: UI_ICON.PROMOTION, roles: [], order: 3};
    const productMenu: UiSidebar = {name: 'Produtos', icon: UI_ICON.PRODUCT, roles: [], order: 1};
    const categoryMenu: UiSidebar = {name: 'Categorias', icon: UI_ICON.CATEGORY, roles: [], order: 2};    
    const shopMenu: UiSidebar = {name: 'Compras', icon: UI_ICON.SHOP, roles: [], order: 4};
    const paymentMenu: UiSidebar = {name: 'Promoções', icon: UI_ICON.PAYMENT, roles: [], order: 5};
    const deliveryMenu: UiSidebar = {name: 'Entregas', icon: UI_ICON.DELIVERY, roles: [], order: 6};
    const userMenu: UiSidebar = {name: this.user?.name ?? 'User', icon: UI_ICON.USER, roles: [], order: 99};

    return [productMenu, categoryMenu, promotionMenu, shopMenu, paymentMenu, deliveryMenu, userMenu];
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

}
