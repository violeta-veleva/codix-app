import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Login } from "./login.model";
import {User} from "../user/user";

export interface UserIntrospect {
  active: boolean
}
@Injectable()
export class LoginService {
  private loginUrl = 'api/login';
  private introspectUrl = 'api/user/introspect';
  private getLoggedUserUrl = 'api/user';

  constructor(private http: HttpClient) {
  }

  login(loginInfo: Login): Observable<User>  {
    return this.http.post<User>(this.loginUrl, loginInfo)
  }

  getLoggedUser(): Observable<User>  {
    return this.http.get<User>(this.getLoggedUserUrl);
  }

  introspect(): Observable<UserIntrospect> {
    return this.http.get<UserIntrospect>(this.introspectUrl)
  }
}
