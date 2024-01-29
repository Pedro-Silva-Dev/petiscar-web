import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'input[ui-input-checkbox]',
  standalone: true,
})
export class UiInputCheckboxDirective {

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('checkbox', 'checkbox-primary', 'h-5', 'w-5', '2xl:h-6', '2xl:w-6', '[--chkfg:white]');
  }

 }
