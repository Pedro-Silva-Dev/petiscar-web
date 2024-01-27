import { NgModule } from "@angular/core";
import { UiFeatherIconDirective } from "./ui-feather-icon.directive";
import { UiIconDirective } from "./ui-icon.directive";

@NgModule({
  imports: [
    UiIconDirective,
    UiFeatherIconDirective,
  ],
  exports: [
    UiIconDirective,
    UiFeatherIconDirective,
  ], 
})
export class UiFeatherIconDirectiveModule {}