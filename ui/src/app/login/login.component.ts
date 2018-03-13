import { Component, OnInit } from '@angular/core';
import { Login } from "./login.model";
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import { LoginActions } from "./login.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public data: Login;
  constructor(private store: Store<AppStore>,
              private loginActions: LoginActions) { }

  ngOnInit() {
    this.data = new Login(null, null, false);
  }
  onSubmit() {
    this.store.dispatch(this.loginActions.login(this.data));
  }
}
