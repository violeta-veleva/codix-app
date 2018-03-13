import { Injectable } from '@angular/core';
import { CustomAction } from '../app.store';

@Injectable()
export class LogoutActions {
  static LOGOUT = '[Logout] Logout';
  logout(): CustomAction {
    return {
      type: LogoutActions.LOGOUT
    };
  }

  static LOGOUT_SUCCESS = '[Logout] Logout Success';
  logoutSuccess(): CustomAction {
    return {
      type: LogoutActions.LOGOUT_SUCCESS
    };
  }
}
