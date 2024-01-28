import { TemplateRef } from "@angular/core";
import { MODAL_SIZE } from "../enums/modal-size.enum";

export interface ModalConfig {
  title: string;
  size: MODAL_SIZE;
  template: TemplateRef<any>;
}

export interface ModalFullFilterConfig {
  title: string;
  sideTitle: string;
  size: MODAL_SIZE;
  template: TemplateRef<any>;
  sideTemplate: TemplateRef<any>;
}