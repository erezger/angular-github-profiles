// home.component.ts
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {User} from '../../../models/user';
import {AppState, selectAuthenticationState, selectProfileState} from '../../../store/app.states';
import {Logout} from '../../../store/actions/auth.actions';
import {GetProfiles} from '../../../store/actions/profile.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: User;
  getAuthState: Observable<any>;
  getProfileState: Observable<any>;
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {
    this.getAuthState = this.store.select(selectAuthenticationState);
    this.getProfileState = this.store.select(selectProfileState);
  }

  ngOnInit() {
    this.getAuthState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
    this.store.dispatch(new GetProfiles());
  }

  logout(): void {
    this.store.dispatch(new Logout);
  }
}
