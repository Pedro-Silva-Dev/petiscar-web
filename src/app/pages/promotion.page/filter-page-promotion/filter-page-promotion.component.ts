import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { NgxMaskDirective } from 'ngx-mask';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiModalSideComponent } from '../../../components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';
import { UiButtonSecondaryDirective } from '../../../shared/directives/buttons/ui-button-secondary.directive';
import { UiInputDirective } from '../../../shared/directives/forms/ui-input.directive';
import { UiLabelDirective } from '../../../shared/directives/forms/ui-label.directive';
import { UiSelectDirective } from '../../../shared/directives/forms/ui-select.directive';

@Component({
  selector: 'app-filter-page-promotion',
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
  templateUrl: './filter-page-promotion.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPagePromotionComponent implements OnInit {

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
      name: [this.filter?.name ? this.filter.name : ''],
      maxDiscount: [this.filter?.maxDiscount ? this.filter?.maxDiscount : null],
      minDiscount: [this.filter?.minDiscount ? this.filter?.minDiscount : null],
      dhi: [this.filter?.dhi ? this.filter?.dhi : null],
      dhf: [this.filter?.dhf ? this.filter?.dhf : null],
      active: [this.filter?.active ? this.filter?.active : null],
    });
  }

}
