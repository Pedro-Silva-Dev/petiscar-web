import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, type OnInit, inject } from '@angular/core';
import { UiInputDirective } from '../../shared/directives/forms/ui-input.directive';
import { UiLabelDirective } from '../../shared/directives/forms/ui-label.directive';
import { UiButtonPrimaryDirective } from '../../shared/directives/buttons/ui-button-primary.directive';
import { IMAGES } from '../../shared/enums/images.enum';
import { UiButtonComponent } from '../../components/forms/ui-button/ui-button.component';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../models/public/auth.model';
import { UiToastComponent } from '../../components/interface/ui-toast/ui-toast.component';
import { UiToastService } from '../../services/ui-toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth.page',
  standalone: true,
  imports: [
    CommonModule,
    UiInputDirective,
    UiLabelDirective,
    UiButtonPrimaryDirective,
    UiButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);
  private _toastService: UiToastService = inject(UiToastService);
  private _router: Router = inject(Router);

  protected isPasswordSecret = signal(true);
  protected readonly IMAGES = IMAGES;
  protected loadLogin = signal(false);

  protected formLogin = this._formBuilder.group({
    username: [''],
    password: ['']  
  });

  protected setPasswordSecret(): void {
    this.isPasswordSecret.update(value => value = !value);
  }

  protected login(): void {
    if(this.formLogin?.valid) {
     this._setLogin();
    }
  }

  /**************** METHODS PRIVATE ****************/

  private _setLogin(): void {
    const username = this.formLogin.value?.username ? this.formLogin.value?.username : '';
    const password = this.formLogin.value?.password ? this.formLogin.value?.password : '';
    const auth: Auth = {username, password};
    
    this._authService.login(auth).subscribe({
      next: res => {
        if(res.status == 200) {
          const token: string = res.body ? res.body.token : '';
          this._setAuthTokenStorage(token);
          this._redirectHomePage();
        }
      },
      error: err => {
        if(err.status == 403) {
          this._toastService.sendWarningMessage(`Usuário ou senha inválida.`)
        }
        this.loadLogin.set(false);
      }
    })
  }

  private _setAuthTokenStorage(token: string): void {
    this._authService.setAuthToken(token);
  }

  private _redirectHomePage(): void {
    this.loadLogin.set(false);
    this._router.navigate([`/`]);
  }


}
