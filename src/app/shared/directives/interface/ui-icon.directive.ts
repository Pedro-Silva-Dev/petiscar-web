import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[ui-icon]',
  standalone: true,
})
export class UiIconDirective implements OnInit { 

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  }

  private _setConfigElement(): void {
    this._element.classList.add('*:w-8', '*:h-8', 'text-primary');
  }

}
