import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit, inject, signal } from '@angular/core';
import { UiModalService } from '../ui-modal.service';

@Component({
    selector: 'app-ui-modal',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './ui-modal.component.html',
    styleUrl: './ui-modal.component.css',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class UiModalComponent implements OnInit {
    
    protected uiModalService: UiModalService = inject(UiModalService);
    protected modal = signal(false);
    protected close = signal(false);

    @Input() default: boolean = false;
    @Input() header: boolean = true;
    @Input() body: boolean = true;
    @Input() footer: boolean = true;


    ngOnInit(): void {
        this._setModalEvent();
    }

    private _setModalEvent(): void {
        this.uiModalService.getModalEvent().subscribe(value => {
            this.close.set(!value);
            setTimeout(() => {
                this.modal.set(value);
            }, 500);
        });
    }


 }
