import { Injectable, WritableSignal, signal } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from '../models/public/auth-token.model';
import { Pagination } from '../shared/models/pagination.model';
import { Product } from '../models/store/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  public getProductPage(build: any, eventComponent?: BehaviorSubject<boolean>, msgError?: string): Observable<HttpResponse<Pagination<Product>>> {
    const url = `/product/index.json`;
    return this.get(url, eventComponent, msgError, build);
  }

  public getProductList(build: any, eventComponent?: BehaviorSubject<boolean>, msgError?: string): Observable<HttpResponse<Product[]>> {
    const url = `/product/list.json`;
    return this.get(url, eventComponent, msgError, build);
  }

  public createProduct(product: Product, eventComponent?: WritableSignal<boolean>, msgError?: string): Observable<HttpResponse<Product>> {
    const url = `/product/admin/create.json`;
    return this.post(url, product, eventComponent, msgError);
  }

  public updateProduct(productId: number, product: Product, eventComponent?: WritableSignal<boolean>, msgError?: string): Observable<HttpResponse<Product>> {
    const url = `/product/admin/${productId}.json`;
    return this.put(url, product, eventComponent, msgError);
  }

}
