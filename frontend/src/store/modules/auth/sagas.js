import { all, takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "~/services/api";
import history from "~/services/history";
import { Types, signInSuccess, signFailure } from "./actions";

const Strings = {
  AUTH_ERROR: "Usuário e/ou Senha inválidos"
};

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, "sessions", {
      email,
      password
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error(Strings.AUTH_ERROR);
      return;
    }

    yield put(signInSuccess(token, user));
    history.push("/dashboard");
  } catch (error) {
    toast.error(Strings.AUTH_ERROR);
    yield put(signFailure());
  }
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
