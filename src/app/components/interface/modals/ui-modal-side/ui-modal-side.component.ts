import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, inject, signal } from '@angular/core';
import { UiModalService } from '../ui-modal.service';
import { FeatherModule } from 'angular-feather';
import { UI_ICON } from '../../../../shared/enums/ui-icons.num';
import { Unsubscribable } from 'rxjs';

@Component({
    selector: 'app-ui-modal-side',
    imports: [
        CommonModule,
        FeatherModule,
    ],
    template: `
    <dialog class="modal {{isOpen() ? 'modal-open' : 'hidden'}}">
        <div class="modal-box p-0 modal-side w-72 md:w-96">
            <div class="border-b-[1px] border-b-slate-600/20">
                <div class="p-4 flex justify-between">
                    <h3 class="text-xl">{{title}}</h3>
                    <i-feather (click)="closeModal()" class="*:w-[1.5rem] *:h-[1.5rem] text-slate-600 cursor-pointer hover:*:text-primary" [name]="icon"></i-feather>
                </div>
            </div>
            <div class="p-4">
              <ng-container #sideModal></ng-container>
            </div>
        </div>
      </dialog>
  `,
    styles: `
    :host {
      display: block;
    }
    
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiModalSideComponent implements OnInit, OnDestroy {
  
    @ViewChild('sideModal', {read: ViewContainerRef}) sideModal: ViewContainerRef;

    private _uiModalService: UiModalService = inject(UiModalService);
    private _unsubscribe: Unsubscribable;

    protected isOpen = signal(false);
    protected icon = UI_ICON.CLOSE;
    protected title: string = `Modal`;

    ngOnInit(): void {
        this._setModalSideEvent();
    }

    ngOnDestroy(): void {
      this._unsubscribe?.unsubscribe();
    } 

    public closeModal(): void {
      this._uiModalService.closeSideModal();
    }

    private _setModalSideEvent(): void {
      this._unsubscribe = this._uiModalService.getModaSidelEvent().subscribe(config => {
        if(config) {
          this.title = config.title;
          this.isOpen.set(true);
          this.sideModal.createEmbeddedView(config.template);
        }else {
            this.sideModal.clear();
            this.isOpen.set(false);
        }
      });
    }
}
