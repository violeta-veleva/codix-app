import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { CustomAction } from "../app.store";
import { LoginActions } from "./login.actions";
import { LoginService } from "./login.service";
import {User} from "../user/user";
import {Observable} from "rxjs/Observable";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

const LOGIN_FAILED_MSG = 'Invalid Login Credentials';

@Injectable() export class LoginEffects {
  constructor( private actions$: Actions, private loginService: LoginService,
               private loginActions: LoginActions,
               private toast: ToastrService,
               private router: Router) { }

  @Effect()
  login$ = this.actions$
    .ofType(LoginActions.LOGIN)
    .switchMap((action: CustomAction) =>
      this.loginService.login(action.payload)
        .map((user: User) => {
          this.router.navigate(['/home']);
          return this.loginActions.loginSuccess(user)
        })
        .catch(error =>  {
          this.toast.error(LOGIN_FAILED_MSG);
          return Observable.of(this.loginActions.loginFailed())
        })
    );

  @Effect()
  getLoggedUser$ = this.actions$
    .ofType(LoginActions.GET_LOGGED_USER)
    .switchMap((action: CustomAction) =>
      this.loginService.getLoggedUser()
        .map((user: User) => this.loginActions.getLoggedUserSuccess(user))
        .catch(error => Observable.of(this.loginActions.getLoggedUserFailed())));

}
