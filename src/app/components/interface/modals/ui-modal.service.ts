import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiModalService {

  private _modalEvent$ = new BehaviorSubject(false);

  public getEvent(): Observable<boolean> {
    return this._modalEvent$;
  }

  public open(): void {
    this._modalEvent$.next(true);
  }

  public close(): void {
    this._modalEvent$.next(false);
  }

}
