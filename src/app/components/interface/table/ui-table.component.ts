import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-table',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './ui-table.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class UiTableComponent implements OnInit {

    ngOnInit(): void { }

}

