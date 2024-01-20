import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Output, type OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UiButtonSecondaryDirective } from '../../../shared/directives/buttons/ui-button-secondary.directive';
import { UiInputDirective } from '../../../shared/directives/forms/ui-input.directive';
import { UiLabelDirective } from '../../../shared/directives/forms/ui-label.directive';
import { UiSelectDirective } from '../../../shared/directives/forms/ui-select.directive';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { UiModalSideComponent } from '../../../components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';

@Component({
  selector: 'app-filter-page-product',
  standalone: true,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPageProductComponent {

  @Output() searchEvent$ = new EventEmitter();

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _modalService: UiModalService = inject(UiModalService);

  protected filterForm = this._formBuilder.group({
    name: [''],
    priceMax: [null],
    priceMin: [null],
    stock: [null],
    active: [null],
    productIds: [null],
  });

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

}
