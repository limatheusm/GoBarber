import { all, takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import api from "~/services/api";
import history from "~/services/history";
import { Types, signInSuccess, signFailure } from "./actions";

const Strings = {
  SIGN_IN_ERROR: "Usuário e/ou Senha inválidos",
  SIGN_UP_ERROR: "Falha no cadastro"
};

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, "sessions", {
      email,
      password
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error(Strings.SIGN_IN_ERROR);
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push("/dashboard");
  } catch (error) {
    toast.error(Strings.SIGN_IN_ERROR);
    yield put(signFailure());
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    yield call(api.post, "users", {
      name,
      email,
      password,
      provider: true
    });

    history.push("/");
  } catch (error) {
    toast.error(Strings.SIGN_UP_ERROR);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push("/");
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_UP_REQUEST, signUp),
  takeLatest(Types.SIGN_OUT, signOut)
]);
