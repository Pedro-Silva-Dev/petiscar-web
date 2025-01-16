import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, signal, type OnInit } from '@angular/core';
import { PromotionService } from '../../../services/promotion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiModalService } from '../../../components/interface/modals/ui-modal.service';
import { UiToastService } from '../../../services/ui-toast.service';
import { Promotion } from '../../../models/store/promotion.model';
import { NgxMaskDirective } from 'ngx-mask';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiButtonComponent } from '../../../components/forms/ui-button/ui-button.component';
import { UiModalSideComponent } from '../../../components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiModalComponent } from '../../../components/interface/modals/ui-modal/ui-modal.component';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';
import { UiButtonSecondaryDirective } from '../../../shared/directives/buttons/ui-button-secondary.directive';
import { UiFormDirectiveModule } from '../../../shared/directives/forms/ui-form-directive.module';

@Component({
    selector: 'app-create-promotion',
    imports: [
        CommonModule,
        UiModalComponent,
        NgxMaskDirective,
        ReactiveFormsModule,
        UiFormDirectiveModule,
        UiButtonSecondaryDirective,
        UiModalSideComponent,
        UiButtonPrimaryDirective,
        UiButtonIconComponent,
        UiButtonComponent,
    ],
    templateUrl: './create-promotion.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePromotionComponent implements OnInit {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _modalService: UiModalService = inject(UiModalService);
  private _promotionService: PromotionService = inject(PromotionService);
  private _toastService: UiToastService = inject(UiToastService);

  @Output() finishEvent$ = new EventEmitter<Promotion>();
  
  @Input() promotion: Promotion;
  @Input() component: any;
  @Input() close = signal(false);

  protected promotionForm: FormGroup;
  protected loadLogin = signal(false);

  ngOnInit(): void {
    console.log(new Date());
    
    this._createPromotionForm();
  }

  public save(): void {
    if(this.promotionForm?.valid && this._isPromotionDateValid()) {
      if(this.promotionForm?.value?.id) {
        this._updatePromotion();
      }else {
        this._createPromotion();
      }
    }else if(!this._isPromotionDateValid()) {
      this.loadLogin.set(false);
      this._toastService.sendWarningMessage(`A data final deve ser menor que o dia atual.`)
    }else {
      this.loadLogin.set(false);
    }
  }

  public closeModal(): void {
    this.close.set(false);
    this._modalService.closeModal();
  }

  /*************** METHODS PRIVATE ***************/

  private _createPromotionForm(): void {
    this.promotionForm = this._formBuilder.group({
      id: [this.promotion?.id ? this.promotion.id : null],
      name: [this.promotion?.name ? this.promotion.name : null, [Validators.required, Validators.maxLength(300)]],
      description: [this.promotion?.description ? this.promotion.description : null, [Validators.maxLength(500)]],
      discount: [this.promotion?.discount ? this.promotion.discount : null, [Validators.required]],
      dhi: [this.promotion?.dhi ? formatDate(this.promotion?.dhi, 'yyyy-MM-dd', 'en') : null, [Validators.required]],
      dhf: [this.promotion?.dhf ? formatDate(this.promotion?.dhf, 'yyyy-MM-dd', 'en') : null, [Validators.required]],
      active: [(this.promotion?.active != null && this.promotion?.active != undefined) ? this.promotion.active : true],
    });
  }

  private _createPromotion(): void {
    const dhi = this.promotionForm?.value?.dhi ? formatDate(this.promotionForm?.value?.dhi, 'yyyy-MM-dd', 'en') : null;
    const dhf = this.promotionForm?.value?.dhf ? formatDate(this.promotionForm?.value?.dhf, 'yyyy-MM-dd', 'en') : null;
    const data = {...this.promotionForm.value, dhi, dhf};
    this._promotionService.createPromotion(data, this.loadLogin).subscribe(res => {
      if(res.status == 201) {
        this._toastService.sendSuccessMessage(`Promoção cadastrada com sucesso!`);
        this.finishEvent$.emit(res.body);
        this.closeModal();
      }
    });
  }

  private _updatePromotion(): void {
    const dhi = this.promotionForm?.value?.dhi ? formatDate(this.promotionForm?.value?.dhi, 'yyyy-MM-dd', 'en') : null;
    const dhf = this.promotionForm?.value?.dhf ? formatDate(this.promotionForm?.value?.dhf, 'yyyy-MM-dd', 'en') : null;
    const data = {...this.promotionForm.value, dhi, dhf};
    this._promotionService.updatePromotion(this.promotionForm?.value?.id, data, this.loadLogin).subscribe(res => {
      if(res.status == 202) {
        this._toastService.sendSuccessMessage(`Promoção atualizada com sucesso!`);
        this.finishEvent$.emit(res.body);
        this.closeModal();
      }
    });
  }

  private _isPromotionDateValid(): boolean {
    const dhf = this.promotionForm?.value?.dhf;
    return new Date(dhf) >= new Date() ? true : false;
  }

}
