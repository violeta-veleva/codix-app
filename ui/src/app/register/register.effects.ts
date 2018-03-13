import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { RegisterActions } from './register.actions';
import {InUsePayload, RegisterService} from "./register.service";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import "rxjs/add/operator/debounceTime";
import { Country } from "../country/country.model";
import { CustomAction } from "../app.store";
import { Observable} from "rxjs/Observable";
import {ToastrService} from "ngx-toastr";

const REGISTER_FAILED_MSG = 'Unsuccessful Registration';

@Injectable() export class RegisterEffects {
  constructor( private actions$: Actions, private registerService: RegisterService,
               private registerActions: RegisterActions,
               private toast: ToastrService) { }

  @Effect()
  loadCategories$ = this.actions$
    .ofType(RegisterActions.LOAD_COUNTRIES)
    .switchMap(() => this.registerService.loadCountries()
      .map((countries: Country[]) => this.registerActions.loadCountriesSuccess(countries)));

  @Effect()
  register$ = this.actions$
    .ofType(RegisterActions.REGISTER)
    .switchMap((action: CustomAction) => this.registerService.register(action.payload)
      .map(() => this.registerActions.registerSuccess())
      .catch(error =>  {
        this.toast.error(REGISTER_FAILED_MSG);
        return Observable.of(this.registerActions.registerFailed())
      }));

  @Effect()
  nicknameExists$ = this.actions$
    .ofType(RegisterActions.NICKNAME_EXISTS_CHECK)
    .debounceTime(200)
    .switchMap((action: CustomAction) => this.registerService.checkIfNicknameExists(action.payload)
      .map((payload: InUsePayload) => this.registerActions.checkIfNicknameExistsSuccess(payload)));

  @Effect()
  emailExists$ = this.actions$
    .ofType(RegisterActions.EMAIL_EXISTS_CHECK)
    .debounceTime(200)
    .switchMap((action: CustomAction) => this.registerService.checkIfEmailExists(action.payload)
      .map((payload: InUsePayload) => this.registerActions.checkIfEmailExistsSuccess(payload)));
}
