import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';

@Component({
    selector: 'app-ui-button',
    imports: [
        CommonModule,
        UiButtonPrimaryDirective
    ],
    template: `
  <button (click)="clickEvent()" ui-primary [disabled]="disabled" class="w-full {{loadAction() ? 'pointer-events-none' : ''}}">
    {{buttonText()}}
    @if(loadAction()) {
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButtonComponent { 

  @Output() clickEvent$ = new EventEmitter<boolean>();

  @Input() disabled = false;
  @Input() loadAction = signal(false);
  @Input() text = 'Salvar';
  @Input() loadText = 'Aguarde...';

  protected buttonText = computed(() => {
    if(this.loadAction()) {
      return this.loadText;
    }
    return this.text;
  });

  public clickEvent(): void {
    this.loadAction.set(true);
    this.clickEvent$.emit(true);
  }

}
