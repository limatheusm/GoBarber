import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input } from "@rocketseat/unform";

import { Container } from "./styles";
import AvatarInput from "./AvatarInput";
import { updateProfileRequest } from "~/store/modules/user/actions";
import { signOut } from "~/store/modules/auth/actions";

const Strings = {
  NAME_PLACEHOLDER: "Nome Completo",
  EMAIL_PLACEHOLDER: "Seu endereço de e-mail",
  OLD_PASSWORD_PLACEHOLDER: "Sua senha atual",
  PASSWORD_PLACEHOLDER: "Nova senha",
  PASSWORD_CONFIRMATION_PLACEHOLDER: "Confirme sua senha",
  UPDATE_PROFILE: "Atualizar perfil",
  SIGN_OUT: "Sair do GoBarber"
};

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder={Strings.NAME_PLACEHOLDER} />
        <Input
          name="email"
          type="email"
          placeholder={Strings.EMAIL_PLACEHOLDER}
        />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder={Strings.OLD_PASSWORD_PLACEHOLDER}
        />
        <Input
          name="password"
          type="password"
          placeholder={Strings.PASSWORD_PLACEHOLDER}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder={Strings.PASSWORD_CONFIRMATION_PLACEHOLDER}
        />

        <button type="submit">{Strings.UPDATE_PROFILE}</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        {Strings.SIGN_OUT}
      </button>
    </Container>
  );
}
