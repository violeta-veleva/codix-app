import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Country } from "../country/country.model";
import { User } from "../user/user";

export interface InUsePayload {
  isUsed: boolean
}
@Injectable()
export class RegisterService {
  private getCountriesUrl = 'api/countries';
  private registerUrl = 'api/register';
  private checkEmailUrl = 'api/user/email/';
  private checkNicknameUrl = `api/user/nickname/`;

  constructor(private http: HttpClient) {
  }

  loadCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.getCountriesUrl);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user)
  }

  checkIfEmailExists(email: string): Observable<InUsePayload> {
    return this.http.get<InUsePayload>(this.checkEmailUrl + email);
  }

  checkIfNicknameExists(nickname: string): Observable<InUsePayload> {
    return this.http.get<InUsePayload>(this.checkNicknameUrl + nickname);
  }
}
