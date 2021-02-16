// home.component.ts
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {User} from '../../models/user';
import {AppState, selectAuthenticationState} from '../../store/app.states';
import {Logout} from '../../store/actions/auth.actions';
import {GetProfiles} from '../../store/actions/profile.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  getState: Observable<any>;
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
    this.store.dispatch(new GetProfiles());
  }

  logout(): void {
    this.store.dispatch(new Logout);
  }
}
