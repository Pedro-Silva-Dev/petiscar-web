import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiButtonPrimaryDirective } from '../../../shared/directives/buttons/ui-button-primary.directive';

@Component({
    selector: 'app-ui-dropdown',
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

    public active: boolean = false;

    public setDropdown(): void {
        this.active = !this.active;
    }

    public closeDropdown(): void {
        this.active = false;
    }

}
