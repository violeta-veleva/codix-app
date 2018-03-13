import { Component, OnInit, OnDestroy } from '@angular/core';
import {Register} from "../register/register.model";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Country} from "../country/country.model";
import {InUsePayload} from "../register/register.service";
import {AppStore} from "../app.store";
import {RegisterActions} from "../register/register.actions";
import {Store} from "@ngrx/store";
import {User} from "../user/user";
import {UserDetailsActions} from "./user-details.actions";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  data: Register;
  user: User;
  countries: Country[];
  countries$: Observable<Country[]>;
  countriesSubscription: Subscription;
  nicknameExists$: Observable<InUsePayload>;
  emailExists$: Observable<InUsePayload>;
  user$: Observable<User>;
  userSubscription : Subscription;

  constructor(private store: Store<AppStore>,
              private registerActions: RegisterActions,
              private  userDetailsActions: UserDetailsActions,
              private toast: ToastrService) {
    this.countries$ = store.select(s => s.state.countries);
    this.user$ = store.select(s => s.state.userDetails);
  }

  ngOnInit() {
    this.store.dispatch(this.registerActions.loadCountries());
    this.countriesSubscription = this.countries$.subscribe(categories => this.countries = categories);
    this.nicknameExists$ = this.store.select(s => s.state.nicknameExists);
    this.emailExists$ = this.store.select(s => s.state.emailExists);
    this.store.dispatch(this.userDetailsActions.getUser());
    this.userSubscription = this.user$.subscribe(user => {
      if(!user) return;
      this.user = user;
      this.initUser();
    });

  }

  initUser() {
    const userDetails = {
      nickname: this.user.nickname,
      email: this.user.email,
      phone: this.user.phone,
      countryId: this.user.countryId
    }
    this.data = new Register(userDetails);
  }

  onSubmit() {
    const formData = this.data;
    const user = new User(formData.nickname, null, null, formData.phone, formData.countryId);
    this.store.dispatch(this.userDetailsActions.updateUser(user));
  }

  ngOnDestroy() {
    this.countriesSubscription.unsubscribe();
  }

  onNicknameTyping() {
    if(!this.data.nickname) return;
    this.store.dispatch(this.registerActions.checkIfNicknameExists(this.data.nickname));
  }

  showUpdateUserSuccessMsg() {
    this.toast.success('Personal Details Updated Successfully');
  }
}
