import { CustomAction } from '../app.store';
import { User } from "../user/user";
import { UserDetailsActions } from "./user-details.actions";

export const userDetailsReducer = (state: any = null, action: CustomAction): User => {
  switch (action.type) {
    case UserDetailsActions.GET_USER_SUCCESS:
      return action.payload;
    case UserDetailsActions.UPDATE_USER_SUCCESS:
      return action.payload;
    case UserDetailsActions.UPDATE_USER_FAILED:
      return state.reset;
    default:
      return state;
  }
};

