import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewContainerRef, inject, signal, type OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/store/category.model';
import { CategoryService } from '../../../services/category.service';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { UiToastService } from '../../../services/ui-toast.service';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiAlertModule } from '../../../components/interface/alerts/ui-alert.module';
import { UiButtonModule } from '../../../shared/directives/buttons/ui-button.module';
import { UiBadgeModule } from '../../../shared/directives/interface/ui-badge/ui-badge.module';
import { UiButtonComponent } from '../../../components/forms/ui-button/ui-button.component';
import { UiFormDirectiveModule } from '../../../shared/directives/forms/ui-form-directive.module';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/store/product.model';
import { BehaviorSubject } from 'rxjs';
import { UiTableComponent } from '../../../components/interface/ui-table/ui-table.component';
import { UI_ICON } from '../../../shared/enums/ui-icons.num';
import { FeatherModule } from 'angular-feather';
import { UiIconDirective } from '../../../shared/directives/interface/icons/ui-icon.directive';
import { UiFeatherIconDirectiveModule } from '../../../shared/directives/interface/icons/ui-icons.module';
import { UiPaginationListComponent } from '../../../components/interface/ui-pagination-list/ui-pagination-list.component';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    CommonModule,
    UiButtonIconComponent,
    UiButtonComponent,
    UiTableComponent,
    UiPaginationListComponent,
    UiButtonModule,
    ReactiveFormsModule,
    UiAlertModule,
    UiBadgeModule,
    UiFormDirectiveModule,
    FeatherModule,
    UiFeatherIconDirectiveModule
  ],
  templateUrl: './create-category.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCategoryComponent implements OnInit {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _modalService: UiModalService = inject(UiModalService);
  private _categoryService: CategoryService = inject(CategoryService);
  private _productService: ProductService = inject(ProductService);
  private _toastService: UiToastService = inject(UiToastService);
  private _changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Output() finishEvent$ = new EventEmitter<Category>();
  
  @Input() category: Category;
  @Input() component: any;
  @Input() close = signal(false);

  protected loadProductListEvent$ = new BehaviorSubject(false);
  protected loadProductsAddedEvent$ = new BehaviorSubject(false);
  protected loadPaginationList = signal(false);

  protected deleteIcon = UI_ICON.DELETE;
  protected page: number = 0;
  protected size: number = 1;
  protected categoryForm: FormGroup;
  protected loadCreateCategory = signal(false);
  protected productList: Product[] = [];
  protected productAddedForCategoryList: Product[] = [];
  protected productAddedList: Product[] = [];

  ngOnInit(): void {
    this._setProductList();
    this._createCategoryForm();
  }

  public save(): void {
    if(this.categoryForm?.valid) {
      if(this.categoryForm?.value?.id) {
        this._updateCategory();
      }else {
        this._createCategory();
      }
    }
  }

  public closeModal(): void {
    this.close.set(false);
    this._modalService.closeModal();
  }

  public addProduct(): void {
    this.loadPaginationList.set(true);
    this._changeDetector.detectChanges();
    this._addProductForList();
    this.loadPaginationList.set(false);
    this._changeDetector.detectChanges();
  }

  public removeProduct(product: Product): void {
    this.productAddedForCategoryList = this.productAddedForCategoryList?.filter(res => res.id != product?.id);
    this.productAddedList = this.productAddedList?.filter(res => res.id != product?.id);
    if(!this.productAddedList?.length && this.page) {
      this.page--;
    }
    this.addProduct();
  }

  public setPage(page: number): void {
    this.page = page;
  }

  public setPaginationList(event: any): void {
    this.productAddedList = event
    this._changeDetector.detectChanges();
  }

  /*************** METHODS PRIVATE ***************/

  private _createCategoryForm(): void {
    this.categoryForm = this._formBuilder.group({
      id: [this.category?.id ? this.category.id : null],
      name: [this.category?.name ? this.category.name : null, [Validators.required, Validators.maxLength(300)]],
      active: [(this.category?.active != null && this.category?.active != undefined) ? this.category.active : true],
      productId: [null],
    });
  }

  private _createCategory(): void {
    const productIds = this.productAddedForCategoryList?.length ? this.productAddedForCategoryList.map(res => res.id) : null;
    const data = {...this.categoryForm.value, productIds}
    this._categoryService.createCategory(data, this.loadCreateCategory).subscribe(res => {
      if(res.status == 201) {
        this._toastService.sendSuccessMessage(`Categoria cadastrado com sucesso!`);
        this.finishEvent$.emit(res.body);
        this.closeModal();
      }
    });
  }

  private _updateCategory(): void {
    const productIds = this.productAddedForCategoryList?.length ? this.productAddedForCategoryList.map(res => res.id) : null;
    const data = {...this.categoryForm.value, productIds}
    this._categoryService.updateCategory(this.categoryForm?.value?.id, data, this.loadCreateCategory).subscribe(res => {
      if(res.status == 202) {
        this._toastService.sendSuccessMessage(`Categoria atualizado com sucesso!`);
        this.finishEvent$.emit(res.body);
        this.closeModal();
      }
    });
  }

  private _setProductList(): void {
    if(!this.category?.id) {
      const build = {active: true};
      this._productService.getProductList(build, this.loadProductListEvent$).subscribe(res => {
        if(res.status == 200) {
          this.productList = res.body;
        }
      });
    }
  }

  private _addProductForList(): void {
    const product: Product = this.categoryForm?.value?.productId ? this.productList?.find(res => res.id == this.categoryForm?.value?.productId) : null;
    if(product) {
      const productAdded = this.productAddedForCategoryList.find(res => res.id == product?.id);
      if(!productAdded) {
        this.productAddedForCategoryList.push(product);
        this.categoryForm?.get('productId')?.setValue(null);
      }else {
        this._toastService.sendInfoMessage(`Esse produto já foi adicionado.`)
      }
    }
  }

}
