// profile.actions.ts
import {Action} from '@ngrx/store';

export enum ProfileActionTypes {
  GET_PROFILES = '[Profile] Get Profiles',
  GET_PROFILES_SUCCESS = '[Profile] Get Profiles Success',
  GET_PROFILES_FAILURE = '[Profile] Get Profiles Failure',
}

export class GetProfiles implements Action {
  readonly type = ProfileActionTypes.GET_PROFILES;

  constructor() {
  }
}

export class GetProfileSuccess implements Action {
  readonly type = ProfileActionTypes.GET_PROFILES_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetProfileFailure implements Action {
  readonly type = ProfileActionTypes.GET_PROFILES_FAILURE;

  constructor(public payload: any) {
  }
}

export type ProfileActions =
  | GetProfile
  | GetProfileSuccess
  | GetProfileFailure;
