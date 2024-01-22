import { TemplateRef } from "@angular/core";
import { MODAL_SIZE } from "../enums/modal-size.enum";

export interface ModalConfig {
  title: string;
  size: MODAL_SIZE;
  template: TemplateRef<any>;
}