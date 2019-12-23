import produce from "immer";

// import { Types } from "./actions";
import { Types as AuthTypes } from "~/store/modules/auth/actions";

const INITIAL_STATE = {
  profile: null
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      default:
    }
  });
}
