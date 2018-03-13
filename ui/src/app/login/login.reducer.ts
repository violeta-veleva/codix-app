import { LoginActions } from './login.actions';
import { CustomAction } from '../app.store';
import { LogoutActions } from "../logout/logout.actions";

export const loginReducer = (state: any = null, action: CustomAction): any => {
  switch (action.type) {
    case LoginActions.LOGIN_SUCCESS:
      return action.payload
    case LoginActions.LOGIN_FAILED:
      return state && state.reset
    case LoginActions.GET_LOGGED_USER_SUCCESS:
      return action.payload
    case LoginActions.GET_LOGGED_USER_FAILED:
      return state && state.reset
    case LogoutActions.LOGOUT:
      return state && state.reset
    default:
      return state;
  }
};

