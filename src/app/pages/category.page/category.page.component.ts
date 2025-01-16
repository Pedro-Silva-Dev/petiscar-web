import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiAlertModule } from '../../components/interface/alerts/ui-alert.module';
import { UiButtonModule } from '../../shared/directives/buttons/ui-button.module';
import { UiFormDirectiveModule } from '../../shared/directives/forms/ui-form-directive.module';
import { UiBadgeModule } from '../../shared/directives/interface/ui-badge/ui-badge.module';
import { UiTableComponent } from '../../components/interface/ui-table/ui-table.component';
import { UiButtonIconComponent } from '../../components/forms/ui-button/ui-button-icon.component';
import { UiDropdownComponent } from '../../components/interface/ui-dropdown/ui-dropdown.component';
import { UiPaginationComponent } from '../../components/interface/ui-pagination/ui-pagination.component';
import { CategoryService } from '../../services/category.service';
import { UiModalService } from '../../components/interface/modals/ui-modal.service';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../models/store/category.model';
import { Pagination } from '../../shared/models/pagination.model';
import { ModalConfig } from '../../shared/models/modal-config.model';
import { MODAL_SIZE } from '../../shared/enums/modal-size.enum';
import { FilterPageCategoryComponent } from './filter-page-category/filter-page-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { Router } from '@angular/router';
import { ROUTE } from '../../shared/enums/route.enum';
import { UiLinkDirective } from '../../shared/directives/interface/ui-link.directive';

@Component({
    selector: 'app-category.page',
    imports: [
        CommonModule,
        UiTableComponent,
        UiPaginationComponent,
        UiDropdownComponent,
        UiButtonIconComponent,
        FilterPageCategoryComponent,
        CreateCategoryComponent,
        UiFormDirectiveModule,
        UiButtonModule,
        ReactiveFormsModule,
        UiAlertModule,
        UiBadgeModule,
        UiLinkDirective
    ],
    templateUrl: './category.page.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent implements OnInit {

  private _categoryService: CategoryService = inject(CategoryService);
  private _modalService: UiModalService = inject(UiModalService);
  private _router: Router = inject(Router);
  
  protected loadPageCategoryEvent$ = new BehaviorSubject(false);

  protected filterForm: any = {};
  protected page: number = 0;
  protected size: number = 12;
  protected pagination: Pagination<Category>;
  protected categoryList: Category[] = [];
  protected isLoadingButton = signal(false);
  protected categorySelected: Category = null;

  ngOnInit(): void { 
    this._setPageCategory();
  }

  public nextPage(): void {
    this.page++;
    this._setPageCategory();
  }

  public previousPage(): void {
    this.page--;
    this._setPageCategory();
  }

  public displaySideModal(template: TemplateRef<any>): void {
    const config: ModalConfig = {title: 'Pesquisar', size: MODAL_SIZE.SMALL, template};
    this._modalService.openSideModal(config);
  }

  public closeSideModal(): void {
    this._modalService.closeSideModal();
  }

  public search(filterForm: any): void {
    this.filterForm = filterForm;
    this.page = 0;
    this._setPageCategory();
    this.closeSideModal();
  }

  public displayModalCreateCategory(template: TemplateRef<any>, category: Category): void {
    this.categorySelected = category;
    const title = category?.id ? `Atualizar Categoria` : `Cadastrar Categoria`;
    const config: ModalConfig = {title, size: category?.id ? MODAL_SIZE.SMALL : MODAL_SIZE.MEDIUM, template};
    this._modalService.openModal(config);
  }

  public refresh(): void {
    this._setPageCategory();
  }

  public navigateCategoryDetail(category: Category): void {
    const id: number = category?.id ? category.id : 0;
    this._router.navigate([`/${ROUTE.CATEGORY_DETAIL.replace(':id', `${id}`)}`]);
  }

  /******************* METHODS PRIVATE *******************/

  private _setPageCategory(): void {
    const build = {...this.filterForm, page: this.page, size: this.size};
    this._categoryService.getCategoryPage(build, this.loadPageCategoryEvent$).subscribe(res => {
      if(res.status == 200) {
        this.pagination = res.body;
        this.categoryList = res.body.content;
      }
    });
  }

}
