import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ModalConfig, ModalFullFilterConfig } from '../../../shared/models/modal-config.model';

@Injectable({
  providedIn: 'root'
})
export class UiModalService {

  private _modalEvent$ = new Subject<ModalConfig>();
  private _modalSideEvent$ = new Subject<ModalConfig>();
  private _modalFullFilterEvent$ = new Subject<ModalFullFilterConfig>();

  public getModalEvent(): Observable<ModalConfig> {
    return this._modalEvent$.asObservable();
  }

  public openModal(config: ModalConfig): void {
    this._modalEvent$.next(config);
  }

  public closeModal(): void {
    setTimeout(() => {
      this._modalEvent$.next(null);
    }, 0);
  }

  public getModaSidelEvent(): Observable<ModalConfig> {
    return this._modalSideEvent$.asObservable();
  }

  public openSideModal(config: ModalConfig): void {
    this._modalSideEvent$.next(config);
  }

  public closeSideModal(): void {
    setTimeout(() => {
      this._modalSideEvent$.next(null);
    }, 0);
  }

  public getModalFullFilterEvent(): Observable<ModalFullFilterConfig> {
    return this._modalFullFilterEvent$.asObservable();
  }

  public openFullFilterModal(config: ModalFullFilterConfig): void {
    this._modalFullFilterEvent$.next(config);
  }

  public closeFullFilterModal(): void {
    setTimeout(() => {
      this._modalFullFilterEvent$.next(null);
    }, 0);
  }

}
