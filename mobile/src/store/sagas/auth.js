import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { Types, Creators } from '~/store/ducks/auth';

const Strings = {
  ERROR_TITLE: 'Ops!',
  SIGN_IN_FAILURE_MESSAGE: 'Usuário e/ou Senha inválidos',
  SIGN_IN_PROVIDER_MESSAGE: 'Usuário não pode ser prestador de serviço',
  SIGN_UP_FAILURE_MESSAGE: 'Falha no cadastro',
};

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(Strings.ERROR_TITLE, Strings.SIGN_IN_PROVIDER_MESSAGE);
      yield put(Creators.signFailure());
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(Creators.signInSuccess(token, user));
  } catch (error) {
    Alert.alert(Strings.ERROR_TITLE, Strings.SIGN_IN_FAILURE_MESSAGE);
    yield put(Creators.signFailure());
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: false,
    });

    // yield put(Creators.signUpSuccess());
  } catch (error) {
    Alert.alert(Strings.ERROR_TITLE, Strings.SIGN_UP_FAILURE_MESSAGE);
    yield put(Creators.signFailure());
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

export function signOut() {}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(Types.SIGN_IN_REQUEST, signIn),
  takeLatest(Types.SIGN_UP_REQUEST, signUp),
  takeLatest(Types.SIGN_OUT, signOut),
]);
