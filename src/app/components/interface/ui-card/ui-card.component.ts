import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';

@Component({
    selector: 'ui-card',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './ui-card.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class UiCardComponent implements OnInit {

  @Input() default: boolean = false;
  @Input() title: boolean = false;
  @Input() header: boolean = true;
  @Input() body: boolean = true;
  @Input() footer: boolean = true;

    ngOnInit(): void { 
    }

}
