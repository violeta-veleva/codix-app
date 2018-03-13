import { Injectable } from '@angular/core';
import { CustomAction } from '../app.store';
import { Login } from "./login.model";
import {User} from "../user/user";

@Injectable()
export class LoginActions {
  static LOGIN = '[Login] Login';
  login(loginInfo: Login): CustomAction {
    return {
      type: LoginActions.LOGIN,
      payload: loginInfo
    };
  }

  static LOGIN_SUCCESS = '[Login] Login Success';
  loginSuccess(user: User): CustomAction {
    return {
      type: LoginActions.LOGIN_SUCCESS,
      payload: user
    };
  }

  static LOGIN_FAILED = '[Login] Login failed';
  loginFailed(): any {
    return {
      type: LoginActions.LOGIN_FAILED
    };
  }

  static GET_LOGGED_USER = '[Login] Get logged user';
  getLoggedUser(): CustomAction {
    return {
      type: LoginActions.GET_LOGGED_USER
    };
  }

  static GET_LOGGED_USER_SUCCESS = '[Login] Get logged user success';
  getLoggedUserSuccess(user: User): CustomAction {
    return {
      type: LoginActions.GET_LOGGED_USER_SUCCESS,
      payload: user
    };
  }

  static GET_LOGGED_USER_FAILED = '[Login] Get logged user failed';
  getLoggedUserFailed(): any {
    return {
      type: LoginActions.GET_LOGGED_USER_FAILED
    };
  }
}
