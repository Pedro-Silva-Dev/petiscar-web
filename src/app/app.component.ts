import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiToastComponent } from './components/interface/ui-toast/ui-toast.component';
import { UiSidebarComponent } from './components/interface/ui-sidebar/ui-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    UiToastComponent,
    UiSidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'petiscar-web';

  ngOnInit(): void {
    
  }

}
