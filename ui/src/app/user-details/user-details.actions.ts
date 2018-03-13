import { Injectable } from '@angular/core';
import { CustomAction } from '../app.store';
import { User } from "../user/user";
import {RegisterActions} from "../register/register.actions";

@Injectable()
export class UserDetailsActions {
  static GET_USER = '[User Details] Get user';
  getUser(): CustomAction {
    return {
      type: UserDetailsActions.GET_USER
    };
  }
  static GET_USER_SUCCESS = '[User Details] Get user success';
  getUserSuccess(user: User): CustomAction {
    return {
      type: UserDetailsActions.GET_USER_SUCCESS,
      payload: user
    };
  }

  static UPDATE_USER = '[User Details] Update user';
  updateUser(user: User): CustomAction {
    return {
      type: UserDetailsActions.UPDATE_USER,
      payload: user
    };
  }

  static UPDATE_USER_SUCCESS = '[User Details] Update user success';
  updateUserSuccess(): CustomAction {
    return {
      type: UserDetailsActions.UPDATE_USER_SUCCESS
    };
  }

  static UPDATE_USER_FAILED = '[User Details] Update user failed';
  updateUserFailed(): CustomAction {
    return {
      type: UserDetailsActions.UPDATE_USER_FAILED
    };
  }

}
