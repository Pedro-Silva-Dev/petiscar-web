import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { UiFormDirectiveModule } from '../../../shared/directives/forms/ui-form-directive.module';
import { NgxMaskDirective } from 'ngx-mask';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiModalSideComponent } from '../../../components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiButtonModule } from '../../../shared/directives/buttons/ui-button.module';

@Component({
    selector: 'app-filter-page-category',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        UiModalSideComponent,
        UiButtonIconComponent,
        UiFormDirectiveModule,
        UiButtonModule
    ],
    templateUrl: './filter-page-category.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageCategoryComponent implements OnInit {

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
      active: [this.filter?.active ? this.filter?.active : null],
    });
  }

}
