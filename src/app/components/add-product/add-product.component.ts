import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FilterPageProductComponent } from '../../pages/product.page/filter-page-product/filter-page-product.component';
import { ProductService } from '../../services/product.service';
import { Pagination } from '../../shared/models/pagination.model';
import { Product } from '../../models/store/product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FilterPageProductComponent
  ],
  templateUrl: './add-product.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit {

  private _productService: ProductService = inject(ProductService);

  protected loadPageProductEvent$ = new BehaviorSubject(false);

  protected page: number = 0;
  protected size: number = 12;
  protected filterForm: any = {};
  protected pagination: Pagination<Product>;
  protected productList: Product[] = [];

  ngOnInit(): void { 
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
