import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/interface/card/card.component';
import { ButtonPrimaryDirective } from './shared/directives/buttons/button-primary.directive';
import { ButtonSecondaryDirective } from './shared/directives/buttons/button-secondary.directive';
import { TableComponent } from './components/interface/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CardComponent,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    TableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'petiscar-web';
}
