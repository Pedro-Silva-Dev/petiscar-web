import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiCardComponent } from './components/interface/card/ui-card.component';
import { UiDropdownComponent } from './components/interface/dropdown/ui-dropdown.component';
import { UiTableComponent } from './components/interface/table/ui-table.component';
import { UiButtonPrimaryDirective } from './shared/directives/buttons/ui-button-primary.directive';
import { UiButtonSecondaryDirective } from './shared/directives/buttons/ui-button-secondary.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    UiCardComponent,
    UiButtonPrimaryDirective,
    UiButtonSecondaryDirective,
    UiTableComponent,
    UiDropdownComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'petiscar-web';
}
