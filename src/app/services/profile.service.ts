// profile.service.ts
import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Profile} from '../models/profile';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) {
  }

  getProfiles(): Observable<Profile[]> {
    // this is a mocked response to be able to test the example
    return from(this.http.get<Profile[]>(this.baseUrl + '/users'))
      .pipe(
        map((response) => response),
      );
    // this would probably make an http post to the server to process the login
    // return this.http.post<User>(url, {email, password});
  }

}
