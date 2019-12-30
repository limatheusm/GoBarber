import { all, takeLatest, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { Types, updateProfileSuccess, updateProfileFailure } from "./actions";
import api from "~/services/api";

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {})
    };

    const response = yield call(api.put, "users", profile);

    toast.success("Perfil atualizado com sucesso!");
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    toast.error("Erro ao atualizar perfil, confirme seus dados!");
    updateProfileFailure();
  }
}

export default all([takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile)]);
