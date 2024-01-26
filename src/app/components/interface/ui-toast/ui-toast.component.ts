import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { UiToastService } from '../../../services/ui-toast.service';
import { UI_TOAST_TYPE } from '../../../shared/enums/ui-toast-type.enum';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  @if(!disable()) {
    <div class="transition-opacity duration-1000 ease-out {{active() ? 'opacity-100 z-[9999] fixed' : 'opacity-0'}}">
        <div class="toast toast-top toast-end">
          <div class="md:max-w-[25rem] alert {{type()}}">
            <span class="text-wrap">{{text()}}</span>
          </div>
        </div>
      </div>
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToastComponent implements OnInit {

  private _uiToastService: UiToastService = inject(UiToastService);

  protected active = signal(false);
  protected disable = signal(true);
  protected type = signal(UI_TOAST_TYPE.SUCCESS);
  protected text = signal('Message sent successfully.');
 
  ngOnInit(): void {
    this._setConfigEvent();
  } 

  /**************** METHODS PRIVATE ****************/

  private _setConfigEvent(): void {
    this._uiToastService.getEvent().subscribe(res => {
      if(!this.active() && res.message) {
        this.type.set(res.type);
        this.text.set(res.message);
        this._timeMessage();
      }
    });
  }

  private _timeMessage(time: number = 3000): void {
    this.disable.set(false);
    this.active.set(true);
    setTimeout(() => {
      this.active.set(false);
    }, time);
    setTimeout(() => {
      this.disable.set(true);
    }, (time + 1000));
  }
  

}
