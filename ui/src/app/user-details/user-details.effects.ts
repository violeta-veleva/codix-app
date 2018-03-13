import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import "rxjs/add/operator/debounceTime";
import { CustomAction } from "../app.store";
import { Observable} from "rxjs/Observable";
import { UserDetailsService } from "./user-details.service";
import { UserDetailsActions } from "./user-details.actions";
import { User } from "../user/user";
import { ToastrService } from 'ngx-toastr';

const UPDATE_SUCCESS_MSG = 'Personal Details Updated Successfully';

@Injectable() export class UserDetailsEffects {

  constructor( private actions$: Actions,
               private userDetailsService: UserDetailsService,
               private userDetailsActions: UserDetailsActions,
               private toast: ToastrService) { }

  @Effect()
  getUser$ = this.actions$
    .ofType(UserDetailsActions.GET_USER)
    .switchMap(() => this.userDetailsService.getUser()
      .map((user: User) => this.userDetailsActions.getUserSuccess(user)));

  @Effect()
  updateUser$ = this.actions$
    .ofType(UserDetailsActions.UPDATE_USER)
    .switchMap((action: CustomAction) => this.userDetailsService.updateUser(action.payload)
      .map(() => {
        this.toast.success(UPDATE_SUCCESS_MSG);
        return this.userDetailsActions.updateUserSuccess();
      })
      .catch(error =>  Observable.of(this.userDetailsActions.updateUserFailed())));

}
