import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './card.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class CardComponent implements OnInit {

  @Input() default: boolean = false;
  @Input() header: boolean = true;
  @Input() body: boolean = true;
  @Input() footer: boolean = true;

    ngOnInit(): void { }

}
