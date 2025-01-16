import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, type OnInit, inject, ViewChild, ViewContainerRef, AfterViewInit, WritableSignal, signal, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FilterPageProductComponent } from '../../../product.page/filter-page-product/filter-page-product.component';
import { ProductTableComponent } from '../../../product.page/product-table/product-table.component';
import { ModalFullFilterConfig } from '../../../../shared/models/modal-config.model';
import { UiModalService } from '../../../../components/interface/modals/ui-modal.service';
import { UiToastService } from '../../../../services/ui-toast.service';
import { MODAL_SIZE } from '../../../../shared/enums/modal-size.enum';
import { BehaviorSubject, Unsubscribable } from 'rxjs';
import { Product } from '../../../../models/store/product.model';
import { Pagination } from '../../../../shared/models/pagination.model';
import { ProductService } from '../../../../services/product.service';
import { UiPaginationComponent } from '../../../../components/interface/ui-pagination/ui-pagination.component';

@Component({
    selector: 'app-add-product-category',
    imports: [
        CommonModule,
        FilterPageProductComponent,
        ProductTableComponent,
        UiPaginationComponent,
    ],
    templateUrl: './add-product-category.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductCategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('contentFilter') contentFilter: TemplateRef<any>;
  @ViewChild('sideFilter') sideFilter: TemplateRef<any>;

  @Output() closeEvent$ = new EventEmitter<boolean>();
  @Input() productsAddedList: Product[] = [];

  private _toastrService: UiToastService = inject(UiToastService);
  private _modalService: UiModalService = inject(UiModalService);
  private _productService: ProductService = inject(ProductService);
  private _unsubscribe: Unsubscribable;

  protected loadPageProductEvent$ = new BehaviorSubject(false);

  protected page: number = 0;
  protected size: number = 12;
  protected pagination: Pagination<Product>;
  protected productList: WritableSignal<Product[]> = signal([]);
  protected filterForm: any = {};

  ngOnInit(): void {
    this._setModalFullFilterEvent();
    this._setPageProduct();
  }

  ngAfterViewInit(): void {
    this.displayModalAddProducts();
  }

  ngOnDestroy(): void {
    this._unsubscribe?.unsubscribe();
  }

  public search(filterForm: any): void {
    this.filterForm = filterForm;
    this.page = 0;
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

  public displayModalAddProducts(): void {
    const config: ModalFullFilterConfig = {title: 'Adicionar Produtos', sideTitle: 'Pesquisar', size: MODAL_SIZE.SMALL, template: this.contentFilter, sideTemplate: this.sideFilter};
    this._modalService.openFullFilterModal(config);
  }

  /******************* METHODS PRIVATE *******************/

  private _setPageProduct(): void {
    const build = {...this.filterForm, page: this.page, size: this.size};
    this._productService.getProductPage(build, this.loadPageProductEvent$).subscribe(res => {
      if(res.status == 200) {
        this.pagination = res.body;
        this.productList.set(res.body.content);
      }
    });
  }

  private _setModalFullFilterEvent(): void {
    this._unsubscribe = this._modalService.getModalFullFilterEvent().subscribe(res => {
      if(!res) {
        this.closeEvent$.emit(true);
      }
    });
  }
 

}
