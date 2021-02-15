//  login.component.ts
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {User} from '../../models/user';
import {AppState, selectAuthenticationState} from '../../store/app.states';
import {Login} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string = null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const actionPayload = {
      username: this.user.username,
      password: this.user.password
    };
    this.store.dispatch(new Login(actionPayload));
  }

}
