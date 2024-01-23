import { Injectable, WritableSignal } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/store/product.model';
import { Pagination } from '../shared/models/pagination.model';
import { Category } from '../models/store/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  public getCategoryPage(build: any, eventComponent?: BehaviorSubject<boolean>, msgError?: string): Observable<HttpResponse<Pagination<Category>>> {
    const url = `/category/index.json`;
    return this.get(url, eventComponent, msgError, build);
  }

  public getCategoryList(build: any, eventComponent?: BehaviorSubject<boolean>, msgError?: string): Observable<HttpResponse<Category[]>> {
    const url = `/category/list.json`;
    return this.get(url, eventComponent, msgError, build);
  }

  public createCategory(category: Category, eventComponent?: WritableSignal<boolean>, msgError?: string): Observable<HttpResponse<Category>> {
    const url = `/category/admin/create.json`;
    return this.post(url, category, eventComponent, msgError);
  }

  public updateCategory(categoryId: number, category: Category, eventComponent?: WritableSignal<boolean>, msgError?: string): Observable<HttpResponse<Category>> {
    const url = `/category/admin/${categoryId}.json`;
    return this.put(url, category, eventComponent, msgError);
  }

}
