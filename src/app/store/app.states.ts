// app.states.ts
import {createFeatureSelector} from '@ngrx/store';
import * as auth from './reducers/auth.reducer';
import * as profile from './reducers/profile.reducer';

export interface AppState {
  authState: auth.State;
  profileState: profile.State;
}

export const reducers = {
  auth: auth.reducer,
  profile: profile.reducer
};

export const selectAuthenticationState = createFeatureSelector<AppState>('auth');
export const selectProfileState = createFeatureSelector<AppState>('profile');
