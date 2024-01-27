import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'a[ui-link]',
  standalone: true,
})
export class UiLinkDirective {
  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  }

  private _setConfigElement(): void {
    this._element.classList.add('link', 'text-sky-600', 'no-underline', 'hover:text-primary');
  }
 }
