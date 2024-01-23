import { NgModule } from "@angular/core";
import { UiBadgeDefaultDirective } from "./ui-badge-default.directive";
import { UiBadgePrimaryDirective } from "./ui-badge-primary.directive";
import { UiBadgeWarningDirective } from "./ui-badge-warning.directive";
import { UiBadgeSuccessDirective } from "./ui-badge-success.directive";
import { UiBadgeDangerDirective } from "./ui-badge-danger.directive";
import { UiBadgeInfoDirective } from "./ui-badge-info.directive";

@NgModule({
  imports: [
    UiBadgeDefaultDirective,
    UiBadgePrimaryDirective,
    UiBadgeWarningDirective,
    UiBadgeSuccessDirective,
    UiBadgeDangerDirective,
    UiBadgeInfoDirective
  ],
  exports: [
    UiBadgeDefaultDirective,
    UiBadgePrimaryDirective,
    UiBadgeWarningDirective,
    UiBadgeSuccessDirective,
    UiBadgeDangerDirective,
    UiBadgeInfoDirective
  ], 
})
export class UiBadgeModule {}