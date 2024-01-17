import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiModalService {

  private _modalEvent$ = new Subject<boolean>();
  private _modalSideEvent$ = new Subject<boolean>();

  public getModalEvent(): Observable<boolean> {
    return this._modalEvent$.asObservable();
  }

  public openModal(): void {
    this._modalEvent$.next(true);
  }

  public closeModal(): void {
    this._modalEvent$.next(false);
  }

  public getModaSidelEvent(): Observable<boolean> {
    return this._modalSideEvent$.asObservable();
  }

  public openSideModal(): void {
    this._modalSideEvent$.next(true);
  }

  public closeSideModal(): void {
    this._modalSideEvent$.next(false);
  }

}
