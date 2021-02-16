// profile.reducer.ts
import {Profile} from '../../models/profile';
import {ProfileActions, ProfileActionTypes} from '../actions/profile.actions';

export interface State {
  profiles: Profile[];
  errorMessage: string | null;
}

// set the initial state
export const initialState: State = {
  profiles: [],
  errorMessage: null,
};

export function reducer(state = initialState, action: ProfileActions): State {
  switch (action.type) {
    case ProfileActionTypes.GET_PROFILES_SUCCESS: {
      return {
        ...state,
        profiles: action.payload.profiles,
        errorMessage: null,
      };
    }
    case ProfileActionTypes.GET_PROFILES_FAILURE: {
      return {
        ...state,
        errorMessage: 'Unable get github profils',
      };
    }
    default: {
      return state;
    }
  }
}
