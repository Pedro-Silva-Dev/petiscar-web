import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[ui-badge-primary]',
  standalone: true,
})
export class UiBadgePrimaryDirective {

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  }

  private _setConfigElement(): void {
    this._element.classList.add('badge', 'badge-primary', 'badge-outline');
  }

 }
