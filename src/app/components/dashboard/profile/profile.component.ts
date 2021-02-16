// home.component.ts
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState, selectProfileState} from '../../../store/app.states';
import {GetProfiles} from '../../../store/actions/profile.actions';
import {Profile} from '../../../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  getProfileState: Observable<any>;
  profiles: Profile[] = [];

  constructor(private store: Store<AppState>) {
    this.getProfileState = this.store.select(selectProfileState);
  }

  ngOnInit() {
    this.store.dispatch(new GetProfiles());
    this.getProfileState.subscribe((state) => {
      this.profiles = state.profiles;
    });
  }
}
