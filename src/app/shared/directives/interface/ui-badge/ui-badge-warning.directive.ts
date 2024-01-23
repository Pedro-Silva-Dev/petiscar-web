import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[ui-badge-warning]',
  standalone: true,
})
export class UiBadgeWarningDirective {

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  }

  private _setConfigElement(): void {
    this._element.classList.add('badge', 'badge-warning', 'badge-outline');
  }
  
 }
