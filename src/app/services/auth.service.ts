// auth.service.ts
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  testUser: User = {username: 'admin', password: 'admin', token: 'sampleToken'};

  constructor() {
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null;
  }

  login(username: string, password: string): Observable<any> {
    // this is a mocked response to be able to test the example
    return new Observable((observer) => {
      if (username === this.testUser.username && password === this.testUser.password) {
        observer.next({username: this.testUser.username, token: this.testUser.token});
      } else {
        observer.error({error: 'invalid credentials.'});
      }
      observer.complete();
    });
    // this would probably make an http post to the server to process the login
    // return this.http.post<User>(url, {email, password});
  }

}
