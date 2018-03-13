import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class LogoutService {
  private logoutUrl = 'api/logout';

  constructor(private http: HttpClient) {
  }

  logout(): any  {
    return this.http.get<any>(this.logoutUrl)
  }
}
