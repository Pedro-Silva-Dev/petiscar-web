import { NgModule } from "@angular/core";
import { UiAlertDangerComponent } from "./ui-alert-danger.component";
import { UiAlertInfoComponent } from "./ui-alert-info.component";
import { UiAlertSuccessComponent } from "./ui-alert-success.component";
import { UiAlertWarningComponent } from "./ui-alert-warning.component";

@NgModule({
  imports: [
    UiAlertDangerComponent,
    UiAlertInfoComponent,
    UiAlertSuccessComponent,
    UiAlertWarningComponent
  ],
  exports: [
    UiAlertDangerComponent,
    UiAlertInfoComponent,
    UiAlertSuccessComponent,
    UiAlertWarningComponent
  ], 
})
export class UiAlertModule {}
