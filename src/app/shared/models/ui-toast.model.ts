import { UI_TOAST_TYPE } from "../enums/ui-toast-type.enum";

export interface UiToast {
  type: UI_TOAST_TYPE;
  message: string;
}