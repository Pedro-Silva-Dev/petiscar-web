import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiButtonComponent } from '../../../components/forms/ui-button/ui-button.component';
import { UiAlertModule } from '../../../components/interface/alerts/ui-alert.module';
import { UiPaginationListComponent } from '../../../components/interface/ui-pagination-list/ui-pagination-list.component';
import { UiTableComponent } from '../../../components/interface/ui-table/ui-table.component';
import { UiButtonModule } from '../../../shared/directives/buttons/ui-button.module';
import { UiFormDirectiveModule } from '../../../shared/directives/forms/ui-form-directive.module';
import { UiFeatherIconDirectiveModule } from '../../../shared/directives/interface/icons/ui-icons.module';
import { UiBadgeModule } from '../../../shared/directives/interface/ui-badge/ui-badge.module';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/store/category.model';
import { BehaviorSubject } from 'rxjs';
import { UiDropdownComponent } from '../../../components/interface/ui-dropdown/ui-dropdown.component';
import { ROUTE } from '../../../shared/enums/route.enum';
import { UiLinkDirective } from '../../../shared/directives/interface/ui-link.directive';
import { UiToastService } from '../../../services/ui-toast.service';
import { MODAL_SIZE } from '../../../shared/enums/modal-size.enum';
import { ModalConfig, ModalFullFilterConfig } from '../../../shared/models/modal-config.model';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { FilterPageProductComponent } from '../../product.page/filter-page-product/filter-page-product.component';
import { Product } from '../../../models/store/product.model';
import { UiModalFullFilterComponent } from '../../../components/interface/modals/ui-modal-full-filter/ui-modal-full-filter.component';
import { ProductTableComponent } from '../../product.page/product-table/product-table.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';

@Component({
    selector: 'app-category-detail.page',
    imports: [
        CommonModule,
        UiButtonIconComponent,
        UiButtonComponent,
        UiTableComponent,
        AddProductCategoryComponent,
        UiPaginationListComponent,
        FilterPageProductComponent,
        UiButtonModule,
        UiDropdownComponent,
        ReactiveFormsModule,
        UiAlertModule,
        UiBadgeModule,
        UiFormDirectiveModule,
        FeatherModule,
        UiFeatherIconDirectiveModule,
        UiLinkDirective,
        UiModalFullFilterComponent
    ],
    templateUrl: './category-detail.page.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDetailPageComponent implements OnInit {

  private _categoryService: CategoryService = inject(CategoryService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _toastrService: UiToastService = inject(UiToastService);
  private _modalService: UiModalService = inject(UiModalService);
  private _changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _router: Router = inject(Router);
  private _categoryId: number = this._activatedRoute.snapshot.params['id'];

  protected loadCategoryDetailPageEvent$ = new BehaviorSubject(false);
  protected loadRemoveProductCategory = signal(false);
  protected isLoadingButton = signal(false);
  protected displayAddProductCategory = signal(false);
  
  protected filterForm: any = {};
  protected category: Category;
  protected productList: Product[] = [];

  ngOnInit(): void { 
    this._setCategoryById();
  }

  protected navigateCategory(): void {
    this._router.navigate([`/${ROUTE.CATEGORY}`])
  }

  protected removeProducts(productIds: number[]): void {
    if(this.removeProducts?.length) {
      this._removeProductCategory(productIds);
    }
  }

  public displaySideModal(template: TemplateRef<any>): void {
    const config: ModalConfig = {title: 'Pesquisar', size: MODAL_SIZE.SMALL, template};
    this._modalService.openSideModal(config);
  }

  public closeSideModal(): void {
    this._modalService.closeSideModal();
  }

  public search(filterForm: any): void {
    this._detectDetailPage(true);
    this.filterForm = filterForm;
    if(filterForm) {
      this.productList = this._filterProducts(filterForm);
    }
    this.closeSideModal();
    this._detectDetailPage(false);
  }

  protected displayModalAddProducts(value: boolean): void {
    this.displayAddProductCategory.set(value);
  }

  /******************* METHODS PRIVATE *******************/

  private _setCategoryById(): void {
    this._categoryService.getCategoryWithProductList(this._categoryId, this.loadCategoryDetailPageEvent$).subscribe(res => {
      if(res.status == 200) {
        this.category = res.body;
        this.productList = this.category?.products ? this.category?.products : [];
      }
    });
  }

  private _removeProductCategory(productIds: number[]): void {
    this._categoryService.removeProdcutsCategory(this._categoryId, productIds, this.loadRemoveProductCategory).subscribe(res => {
      if(res.status == 200) {
        this._toastrService.sendSuccessMessage(`Produtos removidos com sucesso!`);
        this._setCategoryById();
      }
    });
  }

  private _filterProducts(filterForm: any): Product[] {
    let productList = this.category.products;
    const name: string = filterForm?.name;
    if(name) {
      productList = productList?.filter(res => res.name.toLowerCase().includes(name?.toLowerCase()))
    }
    const priceMax: string = filterForm?.priceMax;
    if(priceMax) {
      productList = productList?.filter(res => res.price <= Number.parseFloat(priceMax));
    }
    const priceMin: string = filterForm?.priceMin;
    if(priceMin) {
      productList = productList?.filter(res => res.price >= Number.parseFloat(priceMin));
    }
    const stock: string = filterForm?.stock;
    if(stock) {
      productList = productList?.filter(res => res.stock <= Number.parseFloat(stock));
    }
    const active: boolean = filterForm?.active;
    if(active) {
      productList = productList?.filter(res => res.active == active);
    }
    return productList;
  }

  private _detectDetailPage(value: boolean) {
    this.loadCategoryDetailPageEvent$.next(value);
    this._changeDetector.detectChanges();
  }

}
