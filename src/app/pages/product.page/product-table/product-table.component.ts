import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, type OnInit, EventEmitter, WritableSignal, signal, computed, ChangeDetectorRef, inject, AfterViewInit } from '@angular/core';
import { UiDropdownComponent } from '../../../components/interface/ui-dropdown/ui-dropdown.component';
import { UiPaginationComponent } from '../../../components/interface/ui-pagination/ui-pagination.component';
import { UiTableComponent } from '../../../components/interface/ui-table/ui-table.component';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../models/store/product.model';
import { UiAlertModule } from '../../../components/interface/alerts/ui-alert.module';
import { UiBadgeModule } from '../../../shared/directives/interface/ui-badge/ui-badge.module';
import { UiFormDirectiveModule } from '../../../shared/directives/forms/ui-form-directive.module';

@Component({
    selector: 'app-product-table',
    imports: [
        CommonModule,
        UiTableComponent,
        UiPaginationComponent,
        UiDropdownComponent,
        UiAlertModule,
        UiBadgeModule,
        UiFormDirectiveModule
    ],
    templateUrl: './product-table.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTableComponent implements OnInit {
 
  @Output() editProductEvent$ = new EventEmitter<Product>();

  @Input() loadPageProductEvent$ = new BehaviorSubject(false);
  @Input() productList: WritableSignal<Product[]> = signal([]);
  @Input() displayButtonAction: boolean = true;
  @Input() productsAddedList: Product[] = [];
  @Input() displayCheckboxAction: boolean = false;

  ngOnInit(): void {
    this._setProductsAdded();
  }

  public displayEditProduct(product: Product): void {
    this.editProductEvent$.emit(product);
  }
  
  public addProduct(product: Product): void {
    const producAdded = this.productsAddedList?.find(res => res.id == product?.id);
    if(producAdded) {
      this._removeProduct(product);
    }else {
      this._addProduct(product);
    }
  }

  /********************** METHODS PRIVATE **********************/

  private _addProduct(product: Product): void {
    this.productsAddedList.push(product);
    product.productAdded = true;
  }

  private _removeProduct(product: Product): void {
    this.productsAddedList = this.productsAddedList?.filter(res => res.id != product?.id);
    product.productAdded = false;
  }

  private _setProductsAdded(): void {
    this.productList.update(res => {
      let products: Product[] = [];
      res.forEach(product => {
        const productAdded = this.productsAddedList?.find(res => res.id == product?.id);
        if(productAdded) {
          product.productAdded = true;
        }
        products.push(product);
      });
      return products;
    })
  }

}
