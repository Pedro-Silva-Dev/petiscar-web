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
    this._element.classList.add('btn', 'btn-sm', 'btn-outline', 'text-slate-600', 'hover:bg-slate-500', 'hover:text-white');
  }


}
