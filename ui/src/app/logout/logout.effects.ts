import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { CustomAction } from "../app.store";
import { LogoutService } from "./logout.service";
import { LogoutActions } from "./logout.actions";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

const LOGOUT_SUCCESS_MSG = 'You Have Successfully Logged Out Of Your Account';

@Injectable() export class LogoutEffects {
  constructor( private actions$: Actions,
               private logoutService: LogoutService,
               private logoutActions: LogoutActions,
               private router: Router,
               private toast: ToastrService) { }

  @Effect()
  logout$ = this.actions$
    .ofType(LogoutActions.LOGOUT)
    .switchMap((action: CustomAction) => this.logoutService.logout()
      .map(() => this.logoutActions.logoutSuccess())
      .do(() => this.router.navigate(['/login']))
      .do(() => this.toast.success(LOGOUT_SUCCESS_MSG)));
}
