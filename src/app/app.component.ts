import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiModalService } from './components/interface/modals/ui-modal.service';
import { UiModalComponent } from './components/interface/modals/ui-modal/ui-modal.component';
import { UiCardComponent } from './components/interface/ui-card/ui-card.component';
import { UiDropdownComponent } from './components/interface/ui-dropdown/ui-dropdown.component';
import { UiTableComponent } from './components/interface/ui-table/ui-table.component';
import { UiButtonPrimaryDirective } from './shared/directives/buttons/ui-button-primary.directive';
import { UiButtonSecondaryDirective } from './shared/directives/buttons/ui-button-secondary.directive';
import { UiInputDirective } from './shared/directives/forms/ui-input.directive';
import { UiLabelDirective } from './shared/directives/forms/ui-label.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'petiscar-web';

  protected uiModalService: UiModalService = inject(UiModalService);
  public modal: any;
  

  ngOnInit(): void {
    
  }

  public openModal(): void {
    this.uiModalService.open();
  }

  public show(): void {
    console.log(`Chamou`);
    
  }
}
