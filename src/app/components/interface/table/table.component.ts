import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class TableComponent implements OnInit {

    ngOnInit(): void { }

}

