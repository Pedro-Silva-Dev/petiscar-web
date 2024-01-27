import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { UiButtonIconComponent } from '../../../components/forms/ui-button/ui-button-icon.component';
import { UiButtonComponent } from '../../../components/forms/ui-button/ui-button.component';
import { UiAlertModule } from '../../../components/interface/alerts/ui-alert.module';
import { UiPaginationListComponent } from '../../../components/interface/ui-pagination-list/ui-pagination-list.component';
import { UiTableComponent } from '../../../components/interface/ui-table/ui-table.component';
import { UiButtonModule } from '../../../shared/directives/buttons/ui-button.module';
import { UiFormDirectiveModule } from '../../../shared/directives/forms/ui-form-directive.module';
import { UiFeatherIconDirectiveModule } from '../../../shared/directives/interface/icons/ui-icons.module';
import { UiBadgeModule } from '../../../shared/directives/interface/ui-badge/ui-badge.module';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/store/category.model';
import { BehaviorSubject } from 'rxjs';
import { UiDropdownComponent } from '../../../components/interface/ui-dropdown/ui-dropdown.component';
import { ROUTE } from '../../../shared/enums/route.enum';
import { UiLinkDirective } from '../../../shared/directives/interface/ui-link.directive';
import { UiToastService } from '../../../services/ui-toast.service';

@Component({
  selector: 'app-category-detail.page',
  standalone: true,
  imports: [
    CommonModule,
    UiButtonIconComponent,
    UiButtonComponent,
    UiTableComponent,
    UiPaginationListComponent,
    UiButtonModule,
    UiDropdownComponent,
    ReactiveFormsModule,
    UiAlertModule,
    UiBadgeModule,
    UiFormDirectiveModule,
    FeatherModule,
    UiFeatherIconDirectiveModule,
    UiLinkDirective
  ],
  templateUrl: './category-detail.page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailPageComponent implements OnInit {

  private _categoryService: CategoryService = inject(CategoryService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _toastrService: UiToastService = inject(UiToastService);
  private _router: Router = inject(Router);
  private _categoryId: number = this._activatedRoute.snapshot.params['id'];

  protected loadCategoryEvent$ = new BehaviorSubject(false);
  protected loadRemoveProductCategory = signal(false);

  protected category: Category;

  ngOnInit(): void { 
    this._setCategoryById();
  }

  protected navigateCategory(): void {
    this._router.navigate([`/${ROUTE.CATEGORY}`])
  }

  protected removeProducts(productIds: number[]): void {
    if(this.removeProducts?.length) {
      this._removeProductCategory(productIds);
    }
  }

  /******************* METHODS PRIVATE *******************/

  private _setCategoryById(): void {
    this._categoryService.getCategoryWithProductList(this._categoryId, this.loadCategoryEvent$).subscribe(res => {
      if(res.status == 200) {
        this.category = res.body;
      }
    });
  }

  private _removeProductCategory(productIds: number[]): void {
    this._categoryService.removeProdcutsCategory(this._categoryId, productIds, this.loadRemoveProductCategory).subscribe(res => {
      if(res.status == 200) {
        this._toastrService.sendSuccessMessage(`Produtos removidos com sucesso!`);
        this._setCategoryById();
      }
    });
  }

}
