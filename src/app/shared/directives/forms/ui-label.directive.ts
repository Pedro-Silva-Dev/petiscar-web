import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'label[ui-label]',
  standalone: true,
})
export class UiLabelDirective { 
  
  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('label', 'text-sm');
  }

}
