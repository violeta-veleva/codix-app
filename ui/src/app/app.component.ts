import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from './app.store';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";
import {LoginActions} from "./login/login.actions";
import {UserIntrospect} from "./login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public loggedUser$: Observable<UserIntrospect>;

  constructor(private store: Store<AppStore>,
              private loginActions: LoginActions){}

  ngOnInit() {
    this.loggedUser$ = this.store.select(s => s.state.loggedUser);
    this.store.dispatch(this.loginActions.getLoggedUser());
  }
}
