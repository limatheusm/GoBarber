import produce from 'immer';

import { Types as AuthTypes } from '~/store/ducks/auth';

export const Types = {
  UPDATE_PROFILE_REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: '@user/UPDATE_PROFILE_FAILURE',
};

const INITIAL_STATE = {
  loading: false,
  profile: null,
};

export default function User(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      // Auth Types [ML]
      case AuthTypes.SIGN_IN_SUCCESS: {
        draft.profile = payload.user;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.profile = null;
        break;
      }
      // User Types [ML]
      case Types.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.UPDATE_PROFILE_SUCCESS: {
        draft.profile = payload.profile;
        draft.loading = false;
        break;
      }
      case Types.UPDATE_PROFILE_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

export const Creators = {
  updateProfileRequest(data) {
    return {
      type: Types.UPDATE_PROFILE_REQUEST,
      payload: { data },
    };
  },
  updateProfileSuccess(profile) {
    return {
      type: Types.UPDATE_PROFILE_SUCCESS,
      payload: { profile },
    };
  },
  updateProfileFailure() {
    return {
      type: Types.UPDATE_PROFILE_FAILURE,
    };
  },
};
