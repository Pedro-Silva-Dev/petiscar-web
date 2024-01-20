import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'small[ui-danger-form]',
  standalone: true,
})
export class UiDangerFormDirective { 
  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('text-rose-600', 'text-xs');
  }
}
