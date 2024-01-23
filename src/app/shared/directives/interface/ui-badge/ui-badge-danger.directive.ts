import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[ui-badge-danger]',
  standalone: true,
})
export class UiBadgeDangerDirective {
  
  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  }

  private _setConfigElement(): void {
    this._element.classList.add('badge', 'badge-error', 'badge-outline');
  }
 }
