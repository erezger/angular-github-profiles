// auth.reducer.ts
import {User} from '../../models/user';
import {AuthenticationActions, AuthenticationActionTypes} from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

// set the initial state with localStorage
export const initialState: State = {
  isAuthenticated: localStorage.getItem('token') !== null,
  user: {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
  },
  errorMessage: null
};

export function reducer(state = initialState, action: AuthenticationActions): State {
  switch (action.type) {
    case AuthenticationActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
        errorMessage: null
      };
    }
    case AuthenticationActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Wrong credentials.'
      };
    }
    case AuthenticationActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
