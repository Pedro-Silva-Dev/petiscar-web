import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Pagination } from '../../shared/models/pagination.model';
import { Product } from '../../models/store/product.model';
import { UiTableComponent } from '../../components/interface/ui-table/ui-table.component';
import { BehaviorSubject } from 'rxjs';
import { UiPaginationComponent } from '../../components/interface/ui-pagination/ui-pagination.component';
import { UiDropdownComponent } from '../../components/interface/ui-dropdown/ui-dropdown.component';
import { UiButtonPrimaryDirective } from '../../shared/directives/buttons/ui-button-primary.directive';
import { UiButtonIconComponent } from '../../components/forms/ui-button/ui-button-icon.component';

@Component({
  selector: 'app-product.page',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent,
    UiPaginationComponent,
    UiDropdownComponent,
    UiButtonPrimaryDirective,
    UiButtonIconComponent
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

  public nextPage(): void {
    this.page++;
    this._setPageProduct();
  }

  public previousPage(): void {
    this.page--;
    this._setPageProduct();
  }


  /******************* METHODS PRIVATE *******************/

  private _setPageProduct(): void {
    const build = {page: this.page, size: this.size};
    this._productService.getProductPage(build, this.loadPageProductEvent$).subscribe(res => {
      if(res.status == 200) {
        this.pagination = res.body;
        this.productList = res.body.content;
      }
    });
  }

}
