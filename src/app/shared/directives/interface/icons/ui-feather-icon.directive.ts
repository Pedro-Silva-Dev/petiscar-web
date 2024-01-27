import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[ui-feather-icon]',
  standalone: true,
})
export class UiFeatherIconDirective {

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  }

  private _setConfigElement(): void {
    this._element.classList.add('*:w-[1.5rem]', '*:h-[1.5rem]', 'text-slate-600', 'cursor-pointer', 'hover:*:text-primary');
  }

 }

