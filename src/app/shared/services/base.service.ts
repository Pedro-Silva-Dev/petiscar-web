import { UiToastService } from './../../services/ui-toast.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError, take, tap, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected http: HttpClient = inject(HttpClient);
  protected toastrService: UiToastService = inject(UiToastService);

  protected get(url: string, eventComponent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false), msgError?: string, build?: any, sort?: string): Observable<HttpResponse<any>> {
    eventComponent?.next(true);
    const sortParam = sort ? `&${sort}` : '';
    const pageCache = false;
    if (pageCache) {
      eventComponent?.next(false);
      const t = new Observable<HttpResponse<any>>(pageCache);
      
      return t;
    }else {
      return this.http.get<any>(`${BASE_URL}${url}?success=true${this._getInfoBuild(build)}${sortParam}`, { observe: 'response' }).pipe(catchError(
      (err: any) => {
          if(msgError) {
            this.toastrService.sendErrorMessage(msgError);
          }
          eventComponent?.next(false);
          return throwError(() => err);
        }
      )).pipe(take(1)).pipe(tap((_: any) => eventComponent?.next(false)));
    }
  }

  protected post(url: string, data: any, eventComponent: BehaviorSubject<boolean> = new BehaviorSubject<any>(false), msgError?: string, build?: any): Observable<HttpResponse<any>> {    
    eventComponent?.next(true);
    return this.http.post<any>(`${BASE_URL}${url}?success=true${this._getInfoBuild(build)}`, data, { observe: 'response' }).pipe(catchError(
      (err: any) => {
        if(msgError) {
          this.toastrService.sendErrorMessage(msgError);
        }
        eventComponent?.next(false);
        return throwError(() => err);
      }
    )).pipe(take(1)).pipe(tap((_: any) => eventComponent?.next(false)));
  }

  protected put(url: string, data: any, eventComponent: BehaviorSubject<boolean> = new BehaviorSubject<any>(false), msgError?: string, build?: any): Observable<HttpResponse<any>> {
    eventComponent?.next(true);
    return this.http.put<any>(`${BASE_URL}${url}?success=true${this._getInfoBuild(build)}`, data, { observe: 'response' }).pipe(catchError(
      (err: any) => {
        if(msgError) {
          this.toastrService.sendErrorMessage(msgError);
        }
        eventComponent?.next(false);
        return throwError(() => err);
      }
    )).pipe(take(1)).pipe(tap((_: any) => eventComponent?.next(false)));
  }

  protected delete(url: string, eventComponent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false), msgError?: string, build?: any): Observable<HttpResponse<any>> {
    eventComponent?.next(true);
    return this.http.delete<boolean>(`${BASE_URL}${url}?success=true${this._getInfoBuild(build)}`, { observe: 'response' }).pipe(catchError(
      (err: any) => {
        if(msgError) {
          this.toastrService.sendErrorMessage(msgError);
        }
        eventComponent?.next(false);
        return throwError(() => err);
      }
    )).pipe(take(1)).pipe(tap((_: any) => eventComponent?.next(false)));
  }

  /******************* METHODS PRIVATE *******************/

  private _getInfoBuild(paramsBuild: any): string {
    const build = this._getParamsBuild(paramsBuild);
    const arrayActive = build?.filter(r => r);
    const arrayNormalized = arrayActive?.map(r => {
      const params = r.split('=');
      const data = params[1]?.replaceAll(',', '@');
      return `${params[0]}=${data}`;
    })
    const params = arrayNormalized?.toString()?.replaceAll(',', '')?.replaceAll('@', ',')
    return params;
  }

  private _getParamsBuild(build: any): string[] {
    let array: string[] = [];
    if (build) {
      Object.keys(build)?.forEach(key => {
        const isFieldValid = ((Array.isArray(build[key]) && build[key]?.length) || !Array.isArray(build[key])) ? true : false;
        if (build[key] != null && build[key] != undefined && isFieldValid) {
          const item = `&${key}=${encodeURIComponent(build[key])}`;
          if(item && item?.length) {
            array.push(item);
          }
        }
      });
    }
    return array;
  }

}
