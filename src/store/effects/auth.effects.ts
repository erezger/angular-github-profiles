// auth.effects.ts
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {AuthenticationService} from '../../services/auth.service';
import {AuthenticationActionTypes, Login, LoginFailure, LoginSuccess} from '../actions/auth.actions';


@Injectable()
export class AuthenticationEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  @Effect()
  Login: Observable<any> = this.actions
    .ofType(AuthenticationActionTypes.LOGIN)
    .pipe(
      map((action: Login) => action.payload),
      switchMap(payload => {
        return this.authenticationService.login(payload.username, payload.password)
          .pipe(
            map((user) => {
              console.log(user);
              return new LoginSuccess({token: user.token, username: payload.username});
            }),
            catchError((error) => {
              return of(new LoginFailure({error}));
            }));
      }));


  @Effect({dispatch: false})
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      // when the user logs in successfully, the token and email are saved to localStorage
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('username', user.payload.username);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN_FAILURE)
  );

  @Effect({dispatch: false})
  public Logout: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGOUT),
    tap((user) => {
      // when the user log out the token and email are removed from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigateByUrl('/login');
    })
  );
}
