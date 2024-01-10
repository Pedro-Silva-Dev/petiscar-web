import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: 'button[ui-secondary]',
  standalone: true,
})
export class UiButtonSecondaryDirective implements OnInit {

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  }

  private _setConfigElement(): void {
    this._element.classList.add('px-4', 'py-1', 'text-sm', 'text-slate-600', 'bg-white', 'rounded', 'border', 'border-slate-500', 'hover:bg-slate-600', 'hover:text-white');
  }


}
