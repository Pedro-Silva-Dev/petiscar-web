import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-category-detail.page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './category-detail.page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailPageComponent implements OnInit {

  ngOnInit(): void { }

}
