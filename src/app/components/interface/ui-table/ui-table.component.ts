import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { UiCardComponent } from '../ui-card/ui-card.component';
import { BehaviorSubject, Unsubscribable } from 'rxjs';

@Component({
    selector: 'ui-table',
    standalone: true,
    imports: [
        CommonModule,
        UiCardComponent
    ],
    templateUrl: './ui-table.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class UiTableComponent implements OnInit, OnDestroy{
   
    @Input() loadEvent$: BehaviorSubject<boolean> = null;
    @Input() header: boolean = false;
    @Input() footer: boolean = false;
    @Input() empty: boolean = false;

    private _unsubscribe: Unsubscribable;
    protected loadEvent = signal(false);
    protected animationEvent = signal(false);

    ngOnInit(): void {
       this._setLoadEvent();
    }

    ngOnDestroy(): void {
        this._unsubscribe?.unsubscribe();
    }

    /******************* METHODS PRIVATE *******************/
 
    private _setLoadEvent(): void {
        if(this.loadEvent$) {
            this._unsubscribe = this.loadEvent$.subscribe(res => {
                this.loadEvent.set(res);
                setTimeout(() => {
                    this.animationEvent.set(res);
                }, 100);
            });
        }
    }

}

