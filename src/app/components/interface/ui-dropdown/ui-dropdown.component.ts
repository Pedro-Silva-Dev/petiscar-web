import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, WritableSignal, signal } from '@angular/core';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';

@Component({
    selector: 'ui-dropdown',
    standalone: true,
    imports: [
        CommonModule,
        UiButtonPrimaryDirective
    ],
    templateUrl: './ui-dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDropdownComponent {

    @Input() text: string = 'Dropdown';

}
