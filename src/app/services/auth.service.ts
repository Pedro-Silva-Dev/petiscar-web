import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../models/public/auth.model';
import { BaseService } from '../shared/services/base.service';
import { Injectable, afterNextRender } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthToken } from '../models/public/auth-token.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthUserToken } from '../models/public/auth-user-token.model';
import Hashids from "hashids";
import { UserAuth } from '../models/public/user-auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  
  private _salt = "d41d8cd98f00b204e9800998ecf8427e";
  private _authKey = 'authKey';

  // constructor() {
  //   super();
  //   afterNextRender(() => {
  //     this.setAuthToken('');
  //     this.getAuthToken();
  //   })
  // }

  public setAuthToken(token: string): void {
    afterNextRender(() => {
      localStorage.removeItem(this._authKey);
      localStorage.setItem(this._authKey, JSON.stringify(token));  
    })
  }

  public getAuthToken(): string {
    afterNextRender(() => {
      const token = localStorage.getItem(this._authKey);
      return token ? JSON.parse(token) : null;
    })
    return '';
  }

  public getUser(): UserAuth {
    const token = this.getAuthToken();
    if (token) {
      const userKey: any = jwtDecode(token);
      if(userKey) {
        const userToken: AuthUserToken = userKey;
        return this._getUserAuth(userToken);
      }
    }
    return null;
  }

  public getUserId(): number {
    return this.getUser()?.id;
  }

  public login(auth: Auth, eventComponent?: BehaviorSubject<boolean>): Observable<HttpResponse<AuthToken>> {
    const msgError = `Não foi possível autenticar.`;
    const url = `/auth/signin.json`;
    return this.post(url, auth, eventComponent, msgError, null);
  }

  /**************** METHODS PRIVATE ****************/

  private _getHashId(valor: string): number {
    const hashids = new Hashids(this._salt, 32);
    if (valor) {
      const ids: number[] = hashids.decode(valor) as number[];
      return ids?.length ? ids[0] : 0;
    }
    return 0;
  }

  private _getUserAuth(authUserToken: AuthUserToken): UserAuth {
    const id: number = this._getHashId(authUserToken.userKey);
    const name: string = authUserToken.name;
    const roles: string[] = authUserToken?.roles?.length ? authUserToken.roles.split(',') : [];
    const userAuth: UserAuth = {id, name, roles}
    return userAuth;
  }

}
