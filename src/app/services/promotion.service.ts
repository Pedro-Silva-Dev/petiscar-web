import { Injectable, WritableSignal } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Promotion } from '../models/store/promotion.model';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pagination } from '../shared/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService extends BaseService {

  public getPromotionPage(build: any, eventComponent?: BehaviorSubject<boolean>, msgError?: string): Observable<HttpResponse<Pagination<Promotion>>> {
    const url = `/promotion/index.json`;
    return this.get(url, eventComponent, msgError, build);
  }

  public getPromotionList(build: any, eventComponent?: BehaviorSubject<boolean>, msgError?: string): Observable<HttpResponse<Promotion[]>> {
    const url = `/promotion/list.json`;
    return this.get(url, eventComponent, msgError, build);
  }

  public createPromotion(promotion: Promotion, eventComponent?: WritableSignal<boolean>, msgError?: string): Observable<HttpResponse<Promotion>> {
    const url = `/promotion/admin/create.json`;
    return this.post(url, promotion, eventComponent, msgError);
  }

  public updatePromotion(promotionId: number, promotion: Promotion, eventComponent?: WritableSignal<boolean>, msgError?: string): Observable<HttpResponse<Promotion>> {
    const url = `/promotion/admin/${promotionId}.json`;
    return this.put(url, promotion, eventComponent, msgError);
  }

}
