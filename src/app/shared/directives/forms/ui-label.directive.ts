import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: 'label[ui-label]',
  standalone: true,
})
export class UiLabelDirective implements OnInit { 

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('label', 'block', 'text-sm');
  }

}
