import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, TemplateRef, type OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UiButtonIconComponent } from '../../components/forms/ui-button/ui-button-icon.component';
import { UiAlertModule } from '../../components/interface/alerts/ui-alert.module';
import { UiModalSideComponent } from '../../components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiDropdownComponent } from '../../components/interface/ui-dropdown/ui-dropdown.component';
import { UiPaginationComponent } from '../../components/interface/ui-pagination/ui-pagination.component';
import { UiTableComponent } from '../../components/interface/ui-table/ui-table.component';
import { UiButtonModule } from '../../shared/directives/buttons/ui-button.module';
import { UiFormDirectiveModule } from '../../shared/directives/forms/ui-form-directive.module';
import { UiBadgeModule } from '../../shared/directives/interface/ui-badge/ui-badge.module';
import { PromotionService } from '../../services/promotion.service';
import { UiModalService } from '../../components/interface/modals/ui-modal.service';
import { BehaviorSubject } from 'rxjs';
import { Promotion } from '../../models/store/promotion.model';
import { ModalConfig } from '../../shared/models/modal-config.model';
import { MODAL_SIZE } from '../../shared/enums/modal-size.enum';
import { Pagination } from '../../shared/models/pagination.model';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';
import { FilterPagePromotionComponent } from './filter-page-promotion/filter-page-promotion.component';

@Component({
  selector: 'app-promotion.page',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    UiTableComponent,
    CreatePromotionComponent,
    UiPaginationComponent,
    UiDropdownComponent,
    UiButtonIconComponent,
    UiModalSideComponent,
    FilterPagePromotionComponent,
    NgxMaskDirective,
    UiFormDirectiveModule,
    UiButtonModule,
    ReactiveFormsModule,
    UiAlertModule,
    UiBadgeModule
  ],
  templateUrl: './promotion.page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionPageComponent implements OnInit {

  private _promotionService: PromotionService = inject(PromotionService);
  private _modalService: UiModalService = inject(UiModalService);
  
  protected loadPagePromotionEvent$ = new BehaviorSubject(false);

  protected filterForm: any = {};
  protected page: number = 0;
  protected size: number = 12;
  protected pagination: Pagination<Promotion>;
  protected promotionList: Promotion[] = [];
  protected isLoadingButton = signal(false);
  protected promotionSelected: Promotion = null;
   

  ngOnInit(): void { 
    this._setPagePromotion();
  }

  public nextPage(): void {
    this.page++;
    this._setPagePromotion();
  }

  public previousPage(): void {
    this.page--;
    this._setPagePromotion();
  }

  public displaySideModal(template: TemplateRef<any>): void {
    const config: ModalConfig = {title: 'Pesquisar', size: MODAL_SIZE.MEDIUM, template};
    this._modalService.openSideModal(config);
  }

  public closeSideModal(): void {
    this._modalService.closeSideModal();
  }

  public search(filterForm: any): void {
    this.filterForm = filterForm;
    this.page = 0;
    this._setPagePromotion();
    this.closeSideModal();
  }

  public displayModalCreatePromotion(template: TemplateRef<any>, promotion: Promotion): void {
    this.promotionSelected = promotion;
    const config: ModalConfig = {title: 'Pesquisar', size: MODAL_SIZE.MEDIUM, template};
    this._modalService.openModal(config);
  }

  public refresh(): void {
    this._setPagePromotion();
  }

  /******************* METHODS PRIVATE *******************/

  private _setPagePromotion(): void {
    const build = {...this.filterForm, page: this.page, size: this.size};
    this._promotionService.getPromotionPage(build, this.loadPagePromotionEvent$).subscribe(res => {
      if(res.status == 200) {
        this.pagination = res.body;
        this.promotionList = res.body.content;
      }
    });
  }

}
