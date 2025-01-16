import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Output, type OnInit, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UiButtonSecondaryDirective } from '../../../shared/directives/buttons/ui-button-secondary.directive';
import { UiInputDirective } from '../../../shared/directives/forms/ui-input.directive';
import { UiLabelDirective } from '../../../shared/directives/forms/ui-label.directive';
import { UiSelectDirective } from '../../../shared/directives/forms/ui-select.directive';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { UiModalSideComponent } from '../../../components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';
import { Product } from '../../../models/store/product.model';

@Component({
    selector: 'app-filter-page-product',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UiInputDirective,
        UiLabelDirective,
        UiSelectDirective,
        NgxMaskDirective,
        UiButtonSecondaryDirective,
        UiModalSideComponent,
        UiButtonPrimaryDirective,
        UiButtonIconComponent,
    ],
    templateUrl: './filter-page-product.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageProductComponent implements OnInit {

  @Output() searchEvent$ = new EventEmitter();
  @Input() filter: any; 

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _modalService: UiModalService = inject(UiModalService);

  protected filterForm: FormGroup;

  ngOnInit(): void {
    this._createFilterForm();
  }

  public search(): void {
    this.searchEvent$.emit(this.filterForm.value);
  }

  public clearFilters(): void {
    this.filterForm.reset();
    this.search();
  }

  public closeModal(): void {
    this._modalService.closeSideModal();
  }

  /***************** METHODS PRIVATE *****************/

  private _createFilterForm(): void {
    this.filterForm = this._formBuilder.group({
      name: [this.filter?.name ? this.filter.name : null],
      priceMax: [this.filter?.priceMax ? this.filter?.priceMax : null],
      priceMin: [this.filter?.priceMin ? this.filter?.priceMin : null],
      stock: [this.filter?.stock ? this.filter?.stock : null],
      active: [this.filter?.active ? this.filter?.active : null],
    });
  }

}
