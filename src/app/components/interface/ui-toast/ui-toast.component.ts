import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { UiToastService } from '../../../services/ui-toast.service';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
      <div class="transition-opacity duration-1000 ease-out {{active() ? 'opacity-100 z-50 fixed' : 'opacity-0'}}">
        <div class="toast toast-top toast-end">
          <div class="md:w-[25rem] alert {{type()}}">
            <span class="text-wrap">{{text()}}</span>
          </div>
        </div>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToastComponent implements OnInit {

  private _uiToastService: UiToastService = inject(UiToastService);

  protected active = signal(false);
  protected type = signal('alert-success');
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
    this.active.set(true);
    setTimeout(() => {
      // this.active.set(false);
    }, time);
  }
  

}
