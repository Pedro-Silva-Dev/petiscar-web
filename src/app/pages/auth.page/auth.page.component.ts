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

@Component({
  selector: 'app-auth.page',
  standalone: true,
  imports: [
    CommonModule,
    UiInputDirective,
    UiLabelDirective,
    UiButtonPrimaryDirective,
    UiButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './auth.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnInit {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);

  protected isPasswordSecret = signal(true);
  protected readonly IMAGES = IMAGES;
  protected loadLogin = signal(false);

  protected formLogin = this._formBuilder.group({
    username: [''],
    password: ['']  
  });

  ngOnInit(): void { }

  protected setPasswordSecret(): void {
    this.isPasswordSecret.update(value => value = !value);
  }

  protected login(): void {
    if(this.formLogin?.valid) {
      const username = this.formLogin.value?.username ? this.formLogin.value?.username : '';
      const password = this.formLogin.value?.password ? this.formLogin.value?.password : '';
      const auth: Auth = {username, password};
      
      this._authService.login(auth).subscribe(res => {
        if(res.status == 200) {
          console.log(res.body);
          this.loadLogin.set(false);
        }
      }, err => {
        this.loadLogin.set(false);
      })
    }
  }



}
