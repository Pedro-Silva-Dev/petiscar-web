import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiToastComponent } from './components/interface/ui-toast/ui-toast.component';
import { UiSidebarComponent } from './components/interface/ui-sidebar/ui-sidebar.component';
import { UiModalComponent } from './components/interface/modals/ui-modal/ui-modal.component';
import { UiModalSideComponent } from './components/interface/modals/ui-modal-side/ui-modal-side.component';
import { UiModalFullFilterComponent } from './components/interface/modals/ui-modal-full-filter/ui-modal-full-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    UiToastComponent,
    UiSidebarComponent,
    UiModalComponent,
    UiModalSideComponent,
    UiModalFullFilterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'petiscar-web';

  ngOnInit(): void {
    
  }

}
