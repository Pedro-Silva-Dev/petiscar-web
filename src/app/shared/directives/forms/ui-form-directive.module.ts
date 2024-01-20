import { NgModule } from "@angular/core";
import { UiDangerFormDirective } from "./ui-danger-form.directive";
import { UiInputDirective } from "./ui-input.directive";
import { UiLabelDirective } from "./ui-label.directive";
import { UiSelectDirective } from "./ui-select.directive";
import { UiTextAreaDirective } from "./ui-text-area.directive";

@NgModule({
  imports: [
    UiDangerFormDirective,
    UiInputDirective,
    UiLabelDirective,
    UiSelectDirective,
    UiTextAreaDirective,
  ],
  exports: [
    UiDangerFormDirective,
    UiInputDirective,
    UiLabelDirective,
    UiSelectDirective,
    UiTextAreaDirective,
  ], 
})
export class UiFormDirectiveModule {}