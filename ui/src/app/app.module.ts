import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './register/register.service';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffects } from "./register/register.effects";
import { rootReducer } from "./app.store";
import { StoreModule } from '@ngrx/store';
import {EqualValidator} from "./utils/validateEqual.directive";
import {RegisterActions} from "./register/register.actions";
import {LoginActions} from "./login/login.actions";
import {LoginEffects} from "./login/login.effects";
import {LoginService} from "./login/login.service";
import { LogoutComponent } from './logout/logout.component';
import {LogoutActions} from "./logout/logout.actions";
import {LogoutService} from "./logout/logout.service";
import {LogoutEffects} from "./logout/logout.effects";
import { HomeComponent } from './home/home.component';
import {AuthGuard} from "./auth.guard";
import {UserDetailsEffects} from "./user-details/user-details.effects";
import {UserDetailsActions} from "./user-details/user-details.actions";
import {UserDetailsService} from "./user-details/user-details.service";
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailsComponent,
    EqualValidator,
    LogoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ state: rootReducer }),
    EffectsModule.forRoot([RegisterEffects, LoginEffects, LogoutEffects, UserDetailsEffects]),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    RegisterService,
    RegisterActions,
    LoginActions,
    LoginService,
    LogoutActions,
    LogoutService,
    UserDetailsActions,
    UserDetailsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
