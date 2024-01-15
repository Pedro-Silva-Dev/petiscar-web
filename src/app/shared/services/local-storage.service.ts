import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _localStorage: any = null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this._localStorage = document.defaultView?.localStorage;
  }

  public setItemStorage(key: string, value: string): void {
    if(this._localStorage) {
      this._localStorage.removeItem(key);
      this._localStorage.setItem(key, value);  
    }
  }

  public removeItemStorage(key: string): void {
    if(this._localStorage) {
      this._localStorage.removeItem(key);
    }
  }

  public getItemStorage(key: string): string {
    if(this._localStorage) {
      const token = this._localStorage.getItem(key);
      return token ? token : null;
    }
    return '';
  }

}
