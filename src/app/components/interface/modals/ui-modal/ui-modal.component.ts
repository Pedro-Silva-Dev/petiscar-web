import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output, inject, signal } from '@angular/core';
import { UiModalService } from '../ui-modal.service';
import { Unsubscribable } from 'rxjs';
import { UI_ICON } from '../../../../shared/enums/ui-icons.num';
import { FeatherModule } from 'angular-feather';
import { MODAL_SIZE } from '../../../../shared/enums/modal-size.enum';

@Component({
    selector: 'app-ui-modal',
    standalone: true,
    imports: [
        CommonModule,
        FeatherModule,
    ],
    template: `
    @if(isOpen()) {
        <dialog class="modal {{animationStart() ? 'modal-open' : ''}}">
        <div class="modal-box p-0 ui-y-scroll {{size}}">
            <div class="border-b-[1px] border-b-slate-600/20">
                <div class="p-4 flex justify-between">
                    <h3 class="text-xl">{{titleText}}</h3>
                    <i-feather (click)="closeModal()" class="*:w-[1.5rem] *:h-[1.5rem] text-slate-600 cursor-pointer hover:*:text-primary" [name]="icon"></i-feather>
                </div>
            </div>
            @if(body) {
                <div class="p-4">
                    <ng-content select="[body]"></ng-content>
                </div>
            }
            @if(footer) {
                <div class="border-t-[1px] border-t-slate-600/20">
                    <div class="p-4">
                        <ng-content select="[footer]"></ng-content>
                    </div>
                </div>
            }
        </div>
    </dialog>
    }
    `,
    styles: `
      :host {
        display: block;
      }
    `,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class UiModalComponent implements OnInit {

    @Input() close = signal(false);
    @Input() title: boolean = true;
    @Input() body: boolean = true;
    @Input() footer: boolean = true;
    @Input() size: MODAL_SIZE = MODAL_SIZE.MEDIUM;
    @Input() titleText: string = 'Título';

    private _uiModalService: UiModalService = inject(UiModalService);
    private _unsubscribe: Unsubscribable;

    protected icon = UI_ICON.CLOSE;
    protected isOpen = signal(false);
    protected animationStart = signal(false);
    protected animationOut = signal(false);

    ngOnInit(): void {
        this._setModalSideEvent();
    }

    ngOnDestroy(): void {
      this._unsubscribe?.unsubscribe();
    } 


    public closeModal(): void {
      this._uiModalService.closeModal();
      this.close?.set(false);
    }

    private _setModalSideEvent(time: number = 100): void {
      this._unsubscribe = this._uiModalService.getModalEvent().subscribe(value => {
        if(value) {
          this.animationOut.set(false);
          this.isOpen.set(true);
          setTimeout(() => {
            this.animationStart.set(true)
          }, time);
        }else {
          this.animationStart.set(false);
          this.animationOut.set(true);
          setTimeout(() => {
            this.isOpen.set(false);
          }, (time + 300));
        }
      
      });
    }


 }
