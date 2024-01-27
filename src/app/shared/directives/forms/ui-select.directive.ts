import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: 'select[ui-select],ng-select[ui-select]',
  standalone: true,
})
export class UiSelectDirective implements OnInit { 
  
  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('select', 'select-bordered', 'w-full', 'focus:outline-none');
  }

}
