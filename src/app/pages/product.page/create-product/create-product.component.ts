import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, Output, type OnInit, EventEmitter, signal, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import { UiModalComponent } from '../../../components/interface/modals/ui-modal/ui-modal.component';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiModalSideComponent } from '../../../components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';
import { UiButtonSecondaryDirective } from '../../../shared/directives/buttons/ui-button-secondary.directive';
import { UiInputDirective } from '../../../shared/directives/forms/ui-input.directive';
import { UiLabelDirective } from '../../../shared/directives/forms/ui-label.directive';
import { UiSelectDirective } from '../../../shared/directives/forms/ui-select.directive';
import { Product } from '../../../models/store/product.model';
import { UiFormDirectiveModule } from '../../../shared/directives/forms/ui-form-directive.module';
import { ProductService } from '../../../services/product.service';
import { UiToastService } from '../../../services/ui-toast.service';
import { UiButtonComponent } from '../../../components/forms/ui-button/ui-button.component';

@Component({
    selector: 'app-create-product',
    imports: [
        CommonModule,
        UiModalComponent,
        NgxMaskDirective,
        ReactiveFormsModule,
        UiFormDirectiveModule,
        UiButtonSecondaryDirective,
        UiModalSideComponent,
        UiButtonPrimaryDirective,
        UiButtonIconComponent,
        UiButtonComponent,
    ],
    templateUrl: './create-product.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class CreateProductComponent implements OnInit {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _modalService: UiModalService = inject(UiModalService);
  private _productService: ProductService = inject(ProductService);
  private _toastService: UiToastService = inject(UiToastService);

  @Output() finishEvent$ = new EventEmitter<Product>();
  
  @Input() product: Product;
  @Input() component: any;
  @Input() close = signal(false);

  protected productForm: FormGroup;
  protected loadLogin = signal(false);

  ngOnInit(): void {
    this._createProductForm();
  }

  public save(): void {
    if(this.productForm?.valid) {
      if(this.productForm?.value?.id) {
        this._updateProduct();
      }else {
        this._createProduct();
      }
    }
  }

  public closeModal(): void {
    this.close.set(false);
    this._modalService.closeModal();
  }

  /*************** METHODS PRIVATE ***************/

  private _createProductForm(): void {
    this.productForm = this._formBuilder.group({
      id: [this.product?.id ? this.product.id : null],
      name: [this.product?.name ? this.product.name : null, [Validators.required, Validators.maxLength(300)]],
      description: [this.product?.description ? this.product.description : null, [Validators.maxLength(500)]],
      price: [this.product?.price ? this.product.price : null, [Validators.required]],
      stock: [this.product?.stock ? this.product.stock : null, [Validators.required]],
      active: [(this.product?.active != null && this.product?.active != undefined) ? this.product.active : true],
      categoryId: [this.product?.categoryId ? this.product.categoryId : null],
    });
  }

  private _createProduct(): void {
    this._productService.createProduct(this.productForm.value, this.loadLogin).subscribe(res => {
      if(res.status == 201) {
        this._toastService.sendSuccessMessage(`Produto cadastrado com sucesso!`);
        this.finishEvent$.emit(res.body);
        this.closeModal();
      }
    });
  }

  private _updateProduct(): void {
    this._productService.updateProduct(this.productForm?.value?.id, this.productForm.value, this.loadLogin).subscribe(res => {
      if(res.status == 202) {
        this._toastService.sendSuccessMessage(`Produto atualizado com sucesso!`);
        this.finishEvent$.emit(res.body);
        this.closeModal();
      }
    });
  }

}
