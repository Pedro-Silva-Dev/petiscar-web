import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewContainerRef, inject, signal, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/store/category.model';
import { CategoryService } from '../../../services/category.service';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { UiToastService } from '../../../services/ui-toast.service';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiAlertModule } from '../../../components/interface/alerts/ui-alert.module';
import { UiButtonModule } from '../../../shared/directives/buttons/ui-button.module';
import { UiBadgeModule } from '../../../shared/directives/interface/ui-badge/ui-badge.module';
import { UiButtonComponent } from '../../../components/forms/ui-button/ui-button.component';
import { UiFormDirectiveModule } from '../../../shared/directives/forms/ui-form-directive.module';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    CommonModule,
    UiButtonIconComponent,
    UiButtonComponent,
    UiButtonModule,
    ReactiveFormsModule,
    UiAlertModule,
    UiBadgeModule,
    UiFormDirectiveModule
  ],
  templateUrl: './create-category.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCategoryComponent implements OnInit {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _modalService: UiModalService = inject(UiModalService);
  private _categoryService: CategoryService = inject(CategoryService);
  private _toastService: UiToastService = inject(UiToastService);

  @Output() finishEvent$ = new EventEmitter<Category>();
  
  @Input() category: Category;
  @Input() component: any;
  @Input() close = signal(false);

  protected categoryForm: FormGroup;
  protected loadLogin = signal(false);

  ngOnInit(): void {
    this._createCategoryForm();
  }

  public save(): void {
    if(this.categoryForm?.valid) {
      if(this.categoryForm?.value?.id) {
        this._updateCategory();
      }else {
        this._createCategory();
      }
    }
  }

  public closeModal(): void {
    this.close.set(false);
    this._modalService.closeModal();
  }

  /*************** METHODS PRIVATE ***************/

  private _createCategoryForm(): void {
    this.categoryForm = this._formBuilder.group({
      id: [this.category?.id ? this.category.id : null],
      name: [this.category?.name ? this.category.name : null, [Validators.required, Validators.maxLength(300)]],
      active: [(this.category?.active != null && this.category?.active != undefined) ? this.category.active : true],
    });
  }

  private _createCategory(): void {
    this._categoryService.createCategory(this.categoryForm.value, this.loadLogin).subscribe(res => {
      if(res.status == 201) {
        this._toastService.sendSuccessMessage(`Categoria cadastrado com sucesso!`);
        this.finishEvent$.emit(res.body);
        this.closeModal();
      }
    });
  }

  private _updateCategory(): void {
    this._categoryService.updateCategory(this.categoryForm?.value?.id, this.categoryForm.value, this.loadLogin).subscribe(res => {
      if(res.status == 202) {
        this._toastService.sendSuccessMessage(`Categoria atualizado com sucesso!`);
        this.finishEvent$.emit(res.body);
        this.closeModal();
      }
    });
  }

}
