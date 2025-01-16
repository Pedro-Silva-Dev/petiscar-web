import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit, OnDestroy, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { UI_ICON } from '../../../../shared/enums/ui-icons.num';
import { UiModalService } from '../ui-modal.service';
import { FeatherModule } from 'angular-feather';
import { ModalFullFilterConfig } from '../../../../shared/models/modal-config.model';

@Component({
    selector: 'app-ui-modal-full-filter',
    imports: [
        CommonModule,
        FeatherModule,
    ],
    templateUrl: './ui-modal-full-filter.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiModalFullFilterComponent implements OnInit, OnDestroy {

  @ViewChild('modal', {read: ViewContainerRef}) modal: ViewContainerRef;
  @ViewChild('sideModal', {read: ViewContainerRef}) sideModal: ViewContainerRef;

  protected title: boolean = false;
  protected titleText: string = 'Título';
  protected sideTitleText: string = 'Pesquisar';

  private _uiModalService: UiModalService = inject(UiModalService);
  private _unsubscribe: Unsubscribable;

  protected icon = UI_ICON.CLOSE;
  protected isOpen = signal(false);
  protected isAnimation = signal(false);

  ngOnInit(): void {
    this._setModalSideEvent();
  }

  ngOnDestroy(): void {
    this._unsubscribe?.unsubscribe();
  } 

  public closeModal(): void {
    this._uiModalService.closeFullFilterModal();
  }

  private _setModalSideEvent(): void {
    this._unsubscribe = this._uiModalService.getModalFullFilterEvent().subscribe(config => {
      if(config) {
        this._openModal(config);
      }else {
         this._closeModal();
      }
    });
  }

  private _closeModal(): void {
    this.isAnimation.set(false);
    setTimeout(() => {
      this.modal.clear();
      this.sideModal.clear();
      this.isOpen.set(false);
    }, 300);
  }

  private _openModal(config: ModalFullFilterConfig): void {
    if(config.title) {
      this.titleText = config.title;
      this.title = true;
    }
    this.isOpen.set(true);
    setTimeout(() => {
      this.isAnimation.set(true);
      this.modal?.createEmbeddedView(config.template);
      this.sideModal?.createEmbeddedView(config.sideTemplate);
    }, 0);
    
  }

  

}
