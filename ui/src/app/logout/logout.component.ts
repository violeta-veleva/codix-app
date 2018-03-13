import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import {LogoutActions} from "./logout.actions";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<AppStore>,
              private logoutActions: LogoutActions) { }

  ngOnInit() {
  }
  logout() {
    this.store.dispatch(this.logoutActions.logout());
  }
}
