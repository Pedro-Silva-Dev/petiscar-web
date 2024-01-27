import { UI_ICON } from './../../../shared/enums/ui-icons.num';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../../../shared/models/pagination.model';
import { UiIconDirective } from '../../../shared/directives/interface/icons/ui-icon.directive';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    UiIconDirective
  ],
  template: `
  <div class="join w-full">
    <button (click)="previousPage()" class="join-item btn bg-transparent border-transparent rounded-full shadow-none hover:bg-gray-200 hover:border-gray-200"><i-feather class="*:w-6 *:h-6 text-primary" [name]="icons.ARROW_LEFT"></i-feather></button>
    <button class="join-item btn text-stone-700 pointer-events-none bg-transparent border-transparent shadow-none">Página {{(pagination?.number + 1)}}/{{pagination?.totalPages}}</button>
    <button (click)="nextPage()" class="join-item btn bg-transparent border-transparent rounded-full shadow-none hover:bg-gray-200 hover:border-gray-200"><i-feather class="*:w-6 *:h-6 text-primary" [name]="icons.ARROW_RIGHT"></i-feather></button>
  </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPaginationComponent {

  @Output() previousPageEvent$ = new EventEmitter(true);
  @Output() nextPageEvent$ = new EventEmitter(true);
  @Input() pagination: Pagination<any>;

  protected icons = UI_ICON; 

  public previousPage(): void {
    const currentPage: number = (this.pagination?.number + 1);
    console.log(this.pagination?.number);
    console.log(this.pagination?.number > 1);
    console.log(currentPage <= this.pagination?.totalPages);
    
    if(this.pagination?.number > 0 && currentPage <= this.pagination?.totalPages) {
      this.previousPageEvent$.emit(true);
    }
  }

  public nextPage(): void {
    const currentPage: number = (this.pagination?.number + 1);
    if(currentPage < this.pagination?.totalPages) {
      this.nextPageEvent$.emit(true);
    }
  }

  /******************* METHODS PRIVATE *******************/

}
