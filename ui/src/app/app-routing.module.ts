import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { UserDetailsComponent } from './user-details/user-details.component';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'user-details', canActivate: [AuthGuard], component: UserDetailsComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
