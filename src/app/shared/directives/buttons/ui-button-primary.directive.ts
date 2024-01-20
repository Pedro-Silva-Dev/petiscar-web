import { Directive, ElementRef, HostListener, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: 'button[ui-primary],summary[ui-primary]',
  standalone: true,
})
export class UiButtonPrimaryDirective implements OnInit {

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('btn', 'btn-sm', 'btn-outline', 'btn-primary', 'hover:!text-white');
  }




}

