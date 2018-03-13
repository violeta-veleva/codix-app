import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { User } from "../user/user";

@Injectable()
export class UserDetailsService {
  private userUrl = 'api/user';

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.userUrl);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl, user)
  }
}
