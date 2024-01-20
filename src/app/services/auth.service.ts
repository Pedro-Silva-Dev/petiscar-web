import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../models/public/auth.model';
import { BaseService } from '../shared/services/base.service';
import { Inject, Injectable, WritableSignal, afterNextRender, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthToken } from '../models/public/auth-token.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthUserToken } from '../models/public/auth-user-token.model';
import Hashids from "hashids";
import { UserAuth } from '../models/public/user-auth.model';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private _localStorageService: LocalStorageService = inject(LocalStorageService);
  private _router: Router = inject(Router);

  private _salt = "d41d8cd98f00b204e9800998ecf8427e";
  private _authKey = 'authKey';
  private _isUserAuthEvent$ = new BehaviorSubject(this.isUserAuth());

  public getIsUserAuthEvent(): Observable<boolean> {
    return this._isUserAuthEvent$.asObservable();
  }

  public setUserAuth(value: boolean): void {
    if(value && this.isUserAuth()) {
      this._isUserAuthEvent$.next(true);
    }else {
      this._isUserAuthEvent$.next(false);
    }
  }

  public setAuthToken(token: string): void {
    this._localStorageService.setItemStorage(this._authKey, token);
  }

  public getAuthToken(): string {
    return this._localStorageService.getItemStorage(this._authKey);
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

  public isUserAuth(): boolean {
    return this.getUser()?.id ? true : false;
  }

  public logout(): void {
    this._localStorageService.removeItemStorage(this._authKey);
    this.setUserAuth(false);
    this._router.navigate([`/auth`]);
  }

  public login(auth: Auth, eventComponent?: WritableSignal<boolean>, msgError?: string): Observable<HttpResponse<AuthToken>> {
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
