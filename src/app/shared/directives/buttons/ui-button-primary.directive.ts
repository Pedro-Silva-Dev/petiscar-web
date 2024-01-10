import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: 'button[ui-primary]',
  standalone: true,
})
export class UiButtonPrimaryDirective implements OnInit {

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('px-4', 'py-1', 'text-sm', 'text-indigo-600', 'bg-white', 'rounded', 'border', 'border-indigo-500', 'hover:bg-indigo-600', 'hover:text-white');
  }


}

