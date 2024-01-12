import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../models/public/auth.model';
import { BaseService } from '../shared/services/base.service';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthToken } from '../models/public/auth-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  public login(auth: Auth, eventComponent?: BehaviorSubject<boolean>): Observable<HttpResponse<AuthToken>> {
    const msgError = `Não foi possível autenticar.`;
    const url = `/auth/signin.json`;
    return this.post(url, auth, eventComponent, msgError, null);
  }

}
