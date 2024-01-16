import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Pagination } from '../../shared/models/pagination.model';
import { Product } from '../../models/store/product.model';
import { UiTableComponent } from '../../components/interface/ui-table/ui-table.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product.page',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent
  ],
  templateUrl: './product.page.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductPageComponent implements OnInit {

  private _productService: ProductService = inject(ProductService);

  protected loadPageProductEvent$ = new BehaviorSubject(false);

  protected page: number = 0;
  protected size: number = 12;
  protected pagination: Pagination<Product>;
  protected productList: Product[] = [];

  ngOnInit(): void { 
    this._setPageProduct();
  }

  /******************* METHODS PRIVATE *******************/

  private _setPageProduct(): void {
    this.loadPageProductEvent$.next(true);
    const build = {page: this.page, size: this.size};
    this._productService.getProductPage(build).subscribe(res => {
      if(res.status == 200) {
        this.pagination = res.body;
        this.productList = res.body.content;
        this.productList = this.productList.concat(res.body.content)
        this.productList = this.productList.concat(res.body.content)
        setTimeout(() => {
          this.loadPageProductEvent$.next(false);
        }, 2000);
      }
    });
  }

}
