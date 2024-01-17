import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { UI_ICON } from '../../../shared/enums/ui-icons.num';
import { FeatherModule } from 'angular-feather';
import { UiIconDirective } from '../../../shared/directives/interface/ui-icon.directive';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';

@Component({
  selector: 'ui-button-icon',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    UiIconDirective,
    UiButtonPrimaryDirective
  ],
  template: `
   <button (click)="clickEvent()" (mouseover)="hover(true)" (mouseout)="hover(false)" ui-primary class="w-full {{loadAction() && isLoadingActive ? 'pointer-events-none' : ''}}">
   <i-feather class="*:w-[1.3rem] *:h-[1.3rem] text-primary hover:*:text-white {{hoverAction() ? '*:text-white' : ''}}" [name]="icon"></i-feather>
    @if(loadAction() && isLoadingActive) {
      <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    }
  </button>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonIconComponent { 

  @Output() clickEvent$ = new EventEmitter<boolean>();

  @Input() loadAction = signal(false);
  @Input() hoverAction = signal(false);
  @Input() icon: UI_ICON  = UI_ICON.SEARCH;
  @Input() isLoadingActive: boolean = false;

  public clickEvent(): void {
    this.loadAction.set(true);
    this.clickEvent$.emit(true);
  }

  public hover(value: boolean): void {
    this.hoverAction.set(value);
  }

}
