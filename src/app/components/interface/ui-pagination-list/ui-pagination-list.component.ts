import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../../shared/models/pagination.model';
import { UiPaginationComponent } from '../ui-pagination/ui-pagination.component';

@Component({
  selector: 'app-ui-pagination-list',
  standalone: true,
  imports: [
    CommonModule,
    UiPaginationComponent
  ],
  template: `
   @if(data?.length > size) {
    <ui-pagination class="w-full"
      [pagination]="pagination"
      (nextPageEvent$)="nextPage()" (previousPageEvent$)="previousPage()"
    />
   }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UiPaginationListComponent {

  @Input() data: any[];
  @Input() size: number = 10;
  @Input() page: number = 0;

  @Output() getPagination: EventEmitter<any> = new EventEmitter();
  @Output() getPage: EventEmitter<number> = new EventEmitter();

  public pagination: any = {};
  public startPagination: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {
    this.startPage();
  }

  public startPage(): void {
    const pagination: any[] = this._getPagination(this.data, this.page);
    this.getPagination.emit(pagination);
    this.startPagination = true;
    this.getPage.emit(this.page);
  }

  public nextPage(): void {
    const pagination: any[] = this._getPagination(this.data, ++this.page);
    this.getPagination.emit(pagination);
    this.getPage.emit(this.page);
  }

  public previousPage(): void {
    const pagination: any[] = this._getPagination(this.data, --this.page);
    this.getPagination.emit(pagination);
    this.getPage.emit(this.page);
  }

  /*********************** METHODS PRIVATE ***********************/

  private _getPagination(data: any[],  page: number): any[] {
    let dataPagination: any[] = [];
    if(data?.length) {
      this.pagination.number = page;
      const pageBase = (page + 1) //Para inicial a pagina com 1, ja que o padrao do componente de paginacao é 0.
      data?.forEach((res, index) => {
        if(index < (this.size * pageBase) && index >= (this.size * (pageBase - 1))){
          dataPagination.push(res);
        }
      });
      this.pagination.totalElements = data.length;
    }
    this.pagination.content = dataPagination;
    this.pagination.totalPages = this._getPaginationSize();
    return dataPagination;
  }


  private _getPaginationSize(): number {
    let size: number = 0;
    if(this.data?.length && this.size) {
      size = Math.ceil((this.data.length / this.size));
    }
    return size;
  }

 }
