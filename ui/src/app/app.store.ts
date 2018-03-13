import {Action, combineReducers} from '@ngrx/store';
import { Country } from "./country/country.model";
import {
  countriesReducer, emailReducer, nicknameReducer, registerReducer,
  RegisterState
} from './register/register.reducer';
import { loginReducer } from "./login/login.reducer";
import { User } from "./user/user";
import { InUsePayload } from "./register/register.service";
import { userDetailsReducer } from "./user-details/user-details.reducer";
import { UserIntrospect } from "./login/login.service";

export interface CustomAction extends Action{
  payload?: any;
}


export interface AppStore {
  state: {
    countries: Country[];
    register: RegisterState;
    loggedUser: UserIntrospect;
    nicknameExists: InUsePayload,
    emailExists: InUsePayload,
    userDetails: User;
  }
}
export const rootReducer = combineReducers({
  countries: countriesReducer,
  register: registerReducer,
  loggedUser: loginReducer,
  nicknameExists: nicknameReducer,
  emailExists: emailReducer,
  userDetails: userDetailsReducer
})

export default rootReducer;

