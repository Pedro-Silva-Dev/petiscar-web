import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { UiModalService } from '../ui-modal.service';
import { FeatherModule } from 'angular-feather';
import { UI_ICON } from '../../../../shared/enums/ui-icons.num';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-ui-modal-side',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
  ],
  template: `
  @if(isOpen()) {
    <div class="fixed z-99 top-0 left-0 h-full w-full fade bg-slate-700/[.30]">
      <div class="card fixed inset-y-0 -right-12 mt-1.5 w-96 h-[99%] bg-slate-50 shadow-xl rounded-xl duration-300 opacity-0  {{animationStart() ? 'opacity-100 -translate-x-14' : ''}} {{animationOut() ? 'opacity-0 translate-x-14' : '' }}">
        <div class="flex justify-between items-center">
          <h3 class="text-xl pr-4 pl-4 pt-4 md:text-2xl sm:text-lg">{{title}}</h3>  
          <i-feather (click)="closeModal()" class="mr-2 *:w-[1.5rem] *:h-[1.5rem] text-slate-600 cursor-pointer hover:*:text-primary" [name]="icon"></i-feather>
        </div>
          <div class="card-body">
            <ng-content select="[body]"></ng-content>
          <div class="card-actions">
            <ng-content select="[footer]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  }
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiModalSideComponent implements OnInit, OnDestroy {
   
    private _uiModalService: UiModalService = inject(UiModalService);
    private _unsubscribe: Unsubscribable;

    protected isOpen = signal(false);
    protected animationStart = signal(false);
    protected animationOut = signal(false);
    protected icon = UI_ICON.CLOSE;

    @Input() title: string = `Modal`;

    ngOnInit(): void {
        this._setModalSideEvent();
    }

    ngOnDestroy(): void {
      this._unsubscribe?.unsubscribe();
    } 


    public closeModal(): void {
      this._uiModalService.closeSideModal();
    }

    private _setModalSideEvent(time: number = 100): void {
      this._unsubscribe = this._uiModalService.getModaSidelEvent().subscribe(value => {
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
