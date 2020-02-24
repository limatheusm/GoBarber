import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { Types, Creators } from '~/store/ducks/user';

const Strings = {
  FAILURE_TITLE: 'Ops!',
  SUCCESS_TITLE: 'Sucesso!',
  UPDATE_PROFILE_FAILURE_MESSAGE:
    'Erro ao atualizar perfil, verifique seus dados',
  UPDATE_PROFILE_SUCCESS_MESSAGE: 'Perfil atualizado',
};

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert(Strings.SUCCESS_TITLE, Strings.UPDATE_PROFILE_SUCCESS_MESSAGE);
    yield put(Creators.updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert(Strings.FAILURE_TITLE, Strings.UPDATE_PROFILE_FAILURE_MESSAGE);
    Creators.updateProfileFailure();
  }
}

export default all([takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile)]);
