import { NgModule } from "@angular/core";
import { UiButtonPrimaryDirective } from "./ui-button-primary.directive";
import { UiButtonSecondaryDirective } from "./ui-button-secondary.directive";

@NgModule({
  imports: [
    UiButtonPrimaryDirective,
    UiButtonSecondaryDirective,
  ],
  exports: [
    UiButtonPrimaryDirective,
    UiButtonSecondaryDirective,
  ], 
})
export class UiButtonModule {}