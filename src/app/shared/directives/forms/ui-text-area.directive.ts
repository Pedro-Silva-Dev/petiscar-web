import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'textarea[ui-textarea]',
  standalone: true,
})
export class UiTextAreaDirective { 
  
  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('textarea', 'textarea-bordered', 'w-full', 'ui-y-scroll', 'focus:outline-none');
  }
}
