import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {LoginService} from "./login/login.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>(( (resolve) => {
      this.loginService.introspect().subscribe(introspect => {
        if(introspect.active){
          resolve(true);
        } else {
          this.router.navigate(["/login"]);
          resolve(false);
        }
      });
    }));
  }

}
