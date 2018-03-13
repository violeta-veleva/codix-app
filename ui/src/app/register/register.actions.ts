import { Injectable } from '@angular/core';
import { CustomAction } from '../app.store';
import { Country } from '../country/country.model';
import { User } from "../user/user";
import { InUsePayload } from "./register.service";

@Injectable()
export class RegisterActions {
  static LOAD_COUNTRIES = '[Register] Load Countries';
  loadCountries(): CustomAction {
    return {
      type: RegisterActions.LOAD_COUNTRIES
    };
  }
  static LOAD_COUNTRIES_SUCCESS = '[Register] Load Countries Success';
  loadCountriesSuccess(countries: Country[]): CustomAction {
    return {
      type: RegisterActions.LOAD_COUNTRIES_SUCCESS,
      payload: countries
    };
  }

  static REGISTER = '[Register] Register';
  register(userInfo: User): CustomAction {
    return {
      type: RegisterActions.REGISTER,
      payload: userInfo
    };
  }

  static REGISTER_SUCCESS = '[Register] Register Success';
  registerSuccess(): CustomAction {
    return {
      type: RegisterActions.REGISTER_SUCCESS
    };
  }

  static REGISTER_FAILED = '[Register] Register Failed';
  registerFailed(): CustomAction {
    return {
      type: RegisterActions.REGISTER_FAILED
    };
  }

  static NICKNAME_EXISTS_CHECK = '[Register] Check if nickname exists';
  checkIfNicknameExists(nickname: string): CustomAction {
    return {
      type: RegisterActions.NICKNAME_EXISTS_CHECK,
      payload: nickname
    };
  }

  static NICKNAME_EXISTS_CHECK_SUCCESS = '[Register] Check if nickname exists success';
  checkIfNicknameExistsSuccess(payload: InUsePayload): CustomAction {
    return {
      type: RegisterActions.NICKNAME_EXISTS_CHECK_SUCCESS,
      payload: payload
    };
  }

  static EMAIL_EXISTS_CHECK = '[Register] Check if email exists';
  checkIfEmailExists(email: string): CustomAction {
    return {
      type: RegisterActions.EMAIL_EXISTS_CHECK,
      payload: email
    };
  }
  static EMAIL_EXISTS_CHECK_SUCCESS = '[Register] Check if email exists success';
  checkIfEmailExistsSuccess(payload: InUsePayload): CustomAction {
    return {
      type: RegisterActions.EMAIL_EXISTS_CHECK_SUCCESS,
      payload: payload
    };
  }
}
