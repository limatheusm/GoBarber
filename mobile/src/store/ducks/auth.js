import produce from 'immer';

export const Types = {
  SIGN_IN_REQUEST: '@auth/SIGN_IN_REQUEST',
  SIGN_UP_REQUEST: '@auth/SIGN_UP_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  SIGN_FAILURE: '@auth/SIGN_FAILURE',
  SIGN_OUT: '@auth/SIGN_OUT',
};

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function Auth(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case Types.SIGN_UP_REQUEST:
      case Types.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SIGN_IN_SUCCESS: {
        draft.token = payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case Types.SIGN_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.SIGN_OUT: {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}

export const Creators = {
  signInRequest(email, password) {
    return {
      type: Types.SIGN_IN_REQUEST,
      payload: { email, password },
    };
  },

  signUpRequest(name, email, password) {
    return {
      type: Types.SIGN_UP_REQUEST,
      payload: { name, email, password },
    };
  },

  signInSuccess(token, user) {
    return {
      type: Types.SIGN_IN_SUCCESS,
      payload: { token, user },
    };
  },

  signFailure() {
    return {
      type: Types.SIGN_FAILURE,
    };
  },

  signOut() {
    return {
      type: Types.SIGN_OUT,
    };
  },
};
