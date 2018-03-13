import { RegisterActions } from './register.actions';
import { CustomAction } from '../app.store';
import { Country } from "../country/country.model";
import { InUsePayload } from "./register.service";
import {LoginActions} from "../login/login.actions";
import {LogoutActions} from "../logout/logout.actions";

export const countriesReducer = (state: any = [], action: CustomAction): Country[] => {
  switch (action.type) {
    case RegisterActions.LOAD_COUNTRIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
export interface RegisterState  {
  registered: boolean
}
const initialRegisterState: RegisterState = {
  registered: false
}
export const registerReducer = (state: RegisterState = initialRegisterState, action: CustomAction): RegisterState => {
  switch (action.type) {
    case RegisterActions.REGISTER_SUCCESS:
      return Object.assign(state, {registered: true})
    case RegisterActions.REGISTER_FAILED:
      return initialRegisterState
    case LogoutActions.LOGOUT:
      return initialRegisterState
    default:
      return state;
  }
};
const initialNicknameState: InUsePayload = {
  isUsed: false
}
export const nicknameReducer = (state: InUsePayload = initialNicknameState, action: CustomAction): InUsePayload => {
  switch (action.type) {
    case RegisterActions.NICKNAME_EXISTS_CHECK_SUCCESS:
      return action.payload
    default:
      return state;
  }
};

const initialEmailState: InUsePayload = {
  isUsed: false
}
export const emailReducer = (state: InUsePayload = initialEmailState, action: CustomAction): InUsePayload => {
  switch (action.type) {
    case RegisterActions.EMAIL_EXISTS_CHECK_SUCCESS:
      return action.payload
    default:
      return state;
  }
};
