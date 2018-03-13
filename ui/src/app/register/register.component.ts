import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { User } from './../user/user';
import { Register } from './register.model';
import { Country } from './../country/country.model';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import { RegisterActions } from './register.actions';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Login } from "../login/login.model";
import { LoginActions } from "../login/login.actions";
import {InUsePayload} from "./register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  user: User;
  data: Register;
  countries: Country[];
  countries$: Observable<Country[]>;
  countriesSubscription: Subscription;
  isRegistered$: Observable<Boolean>;
  isRegisteredSubscription: Subscription;
  loginInfo: Login;
  nicknameExists$: Observable<InUsePayload>;
  emailExists$: Observable<InUsePayload>;

  constructor(private store: Store<AppStore>,
              private registerActions: RegisterActions,
              private  loginActions: LoginActions) {
    this.countries$ = store.select(s =>s.state.countries);
  }
  ngOnInit() {
    this.data = new Register();
    this.store.dispatch(this.registerActions.loadCountries());
    this.countriesSubscription = this.countries$.subscribe(categories => this.countries = categories);
    this.isRegistered$ = this.store.select(s => s.state.register.registered);
    this.isRegisteredSubscription = this.isRegistered$.subscribe(isRegistered => {
      if(isRegistered) {return this.onRegisterSuccess()}
    });
    this.nicknameExists$ = this.store.select(s => s.state.nicknameExists);
    this.emailExists$ = this.store.select(s => s.state.emailExists);
  }
  onSubmit() {
    const formData = this.data;
    this.user = new User(formData.nickname, formData.email, formData.password, formData.phone, formData.countryId);
    this.loginInfo = new Login(formData.email, formData.password, false);
    this.store.dispatch(this.registerActions.register(this.user));
  }
  ngOnDestroy() {
    this.countriesSubscription.unsubscribe();
    this.isRegisteredSubscription.unsubscribe();
  }
  onRegisterSuccess() {
    this.store.dispatch(this.loginActions.login(this.loginInfo));
  }

  onNicknameTyping() {
    if(!this.data.nickname) return;
    this.store.dispatch(this.registerActions.checkIfNicknameExists(this.data.nickname));
  }

  onEmailTyping() {
    if(!this.data.email) return;
    this.store.dispatch(this.registerActions.checkIfEmailExists(this.data.email));
  }
}
