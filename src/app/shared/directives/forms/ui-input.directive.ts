import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: 'input[ui-input]',
  standalone: true,
})
export class UiInputDirective implements OnInit {

  private _element = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit(): void {
    this._setConfigElement();
  } 

  private _setConfigElement(): void {
    this._element.classList.add('input', 'input-bordered', 'input-md', 'w-full', 'focus:outline-none');
  }



 }
