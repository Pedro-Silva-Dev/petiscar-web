import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-create-promotion',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './create-promotion.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePromotionComponent implements OnInit {

  ngOnInit(): void { }

}
