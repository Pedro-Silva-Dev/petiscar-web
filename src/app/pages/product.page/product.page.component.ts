import { UiInputDirective } from './../../shared/directives/forms/ui-input.directive';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit, signal, TemplateRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Pagination } from '../../shared/models/pagination.model';
import { Product } from '../../models/store/product.model';
import { UiTableComponent } from '../../components/interface/ui-table/ui-table.component';
import { BehaviorSubject } from 'rxjs';
import { UiPaginationComponent } from '../../components/interface/ui-pagination/ui-pagination.component';
import { UiDropdownComponent } from '../../components/interface/ui-dropdown/ui-dropdown.component';
import { UiButtonPrimaryDirective } from '../../shared/directives/buttons/ui-button-primary.directive';
import { UiButtonIconComponent } from '../../components/forms/ui-button/ui-button-icon.component';
import { UiModalSideComponent } from '../../components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiModalService } from '../../components/interface/modals/ui-modal.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UiLabelDirective } from '../../shared/directives/forms/ui-label.directive';
import { UiSelectDirective } from '../../shared/directives/forms/ui-select.directive';
import { NgxMaskDirective } from 'ngx-mask';
import { UiButtonSecondaryDirective } from '../../shared/directives/buttons/ui-button-secondary.directive';
import { FilterPageProductComponent } from './filter-page-product/filter-page-product.component';
import { UiAlertModule } from '../../components/interface/alerts/ui-alert.module';
import { UiModalComponent } from '../../components/interface/modals/ui-modal/ui-modal.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ModalConfig } from '../../shared/models/modal-config.model';
import { MODAL_SIZE } from '../../shared/enums/modal-size.enum';
import { UiBadgeModule } from '../../shared/directives/interface/ui-badge/ui-badge.module';
import { UiButtonModule } from '../../shared/directives/buttons/ui-button.module';
import { UiFormDirectiveModule } from '../../shared/directives/forms/ui-form-directive.module';

@Component({
  selector: 'app-product.page',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent,
    CreateProductComponent,
    UiPaginationComponent,
    UiDropdownComponent,
    UiButtonIconComponent,
    UiModalSideComponent,
    FilterPageProductComponent,
    NgxMaskDirective,
    UiFormDirectiveModule,
    UiButtonModule,
    ReactiveFormsModule,
    UiAlertModule,
    UiBadgeModule
    
  ],
  templateUrl: './product.page.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductPageComponent implements OnInit {

  private _productService: ProductService = inject(ProductService);
  private _modalService: UiModalService = inject(UiModalService);
  
  protected loadPageProductEvent$ = new BehaviorSubject(false);

  protected filterForm: any = {};
  protected page: number = 0;
  protected size: number = 12;
  protected pagination: Pagination<Product>;
  protected productList: Product[] = [];
  protected isLoadingButton = signal(false);
  protected productSelected: Product = null;
   

  ngOnInit(): void { 
    this._setPageProduct();
  }

  public nextPage(): void {
    this.page++;
    this._setPageProduct();
  }

  public previousPage(): void {
    this.page--;
    this._setPageProduct();
  }

  public displaySideModal(template: TemplateRef<any>): void {
    const config: ModalConfig = {title: 'Pesquisar', size: MODAL_SIZE.MEDIUM, template};
    this._modalService.openSideModal(config);
  }

  public closeSideModal(): void {
    this._modalService.closeSideModal();
  }

  public search(filterForm: any): void {
    this.filterForm = filterForm;
    this.page = 0;
    this._setPageProduct();
    this.closeSideModal();
  }

  public displayModalCreateProduct(template: TemplateRef<any>, product: Product): void {
    this.productSelected = product;
    const title = product?.id ? 'Atualizar promoção' : 'Cadastrar promoção';
    const config: ModalConfig = {title, size: MODAL_SIZE.MEDIUM, template};
    this._modalService.openModal(config);
  }

  public refresh(): void {
    this._setPageProduct();
  }

  /******************* METHODS PRIVATE *******************/

  private _setPageProduct(): void {
    const build = {...this.filterForm, page: this.page, size: this.size};
    this._productService.getProductPage(build, this.loadPageProductEvent$).subscribe(res => {
      if(res.status == 200) {
        this.pagination = res.body;
        this.productList = res.body.content;
      }
    });
  }

}
