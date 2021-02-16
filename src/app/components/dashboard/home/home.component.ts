// home.component.ts
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {User} from '../../../models/user';
import {AppState, selectAuthenticationState} from '../../../store/app.states';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  getAuthState: Observable<any>;
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {
    this.getAuthState = this.store.select(selectAuthenticationState);
  }

  ngOnInit() {
    this.getAuthState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
  }
}
